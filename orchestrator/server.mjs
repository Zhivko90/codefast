import { createServer } from 'node:http';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

const run = promisify(execFile);

const PORT = Number(process.env.PORT ?? 3100);
const HOST = process.env.PUBLIC_HOST ?? '77.42.123.202';
const ROOT = process.env.STUDENTS_ROOT ?? '/srv/students';
const IMAGE = process.env.IDE_IMAGE ?? 'codercom/code-server:latest';
const TOKEN = (await readFile(process.env.TOKEN_FILE ?? '/srv/orchestrator/.token', 'utf8')).trim();

const MAX_LIVE = 6;
const PRO_RESERVED = 2;
const NO_BEAT_MS = 60 * 1000;
const LIFE_FREE_MS = 30 * 60 * 1000;
const LIFE_PRO_MS = 2 * 60 * 60 * 1000;

const PORT_MIN = 9000;
const PORT_MAX = 9200;

const SETTINGS = {
  'workbench.colorTheme': 'Default Dark Modern',
  'workbench.activityBar.location': 'hidden',
  'workbench.statusBar.visible': false,
  'workbench.startupEditor': 'none',
  'workbench.editor.enablePreview': false,
  'workbench.editor.enablePreviewFromQuickOpen': false,
  'workbench.layoutControl.enabled': false,
  'workbench.secondarySideBar.defaultVisibility': 'hidden',
  'chat.commandCenter.enabled': false,
  'chat.agent.enabled': false,
  'window.commandCenter': false,
  'window.menuBarVisibility': 'hidden',
  'breadcrumbs.enabled': false,
  'editor.minimap.enabled': false,
  'editor.fontSize': 14,
  'editor.lineHeight': 22,
  'editor.tabSize': 2,
  'telemetry.telemetryLevel': 'off',
  'update.mode': 'none',
  'workbench.tips.enabled': false,
};

const live = new Map();

const keyOf = (student, course) => student + '__' + course;
const nameOf = (key) => 'cs-' + key.replace(/[^a-zA-Z0-9_-]/g, '');

async function docker(args) {
  const { stdout } = await run('docker', args, { maxBuffer: 8 * 1024 * 1024 });
  return stdout.trim();
}

async function freePort() {
  const taken = new Set([...live.values()].map((s) => s.port));
  try {
    const out = await docker(['ps', '--format', '{{.Ports}}']);
    for (const m of out.matchAll(/:(\d+)->/g)) taken.add(Number(m[1]));
  } catch {}
  for (let p = PORT_MIN; p <= PORT_MAX; p++) if (!taken.has(p)) return p;
  return null;
}

async function adopt() {
  try {
    const out = await docker(['ps', '--format', '{{.Names}}|{{.Ports}}']);
    for (const line of out.split('\n')) {
      if (!line.startsWith('cs-')) continue;
      const cut = line.indexOf('|');
      const name = line.slice(0, cut);
      const m = line.slice(cut + 1).match(/:(\d+)->/);
      if (!m) continue;
      const key = name.slice(3);
      const now = Date.now();
      live.set(key, {
        key, name, port: Number(m[1]), pro: false,
        dir: join(ROOT, key, 'workspace'),
        url: 'http://' + HOST + ':' + m[1],
        beat: now, born: now,
      });
    }
    if (live.size) console.log('adopted ' + live.size);
  } catch {}
}

async function alive(name) {
  try {
    return (await docker(['ps', '-q', '--filter', 'name=^' + name + '$'])) !== '';
  } catch {
    return false;
  }
}

async function kill(key) {
  try { await docker(['rm', '-f', nameOf(key)]); } catch {}
  live.delete(key);
}

// Свободни места. Безплатните не пипат запазените за Pro.
function room(pro) {
  const used = live.size;
  return pro ? used < MAX_LIVE : used < MAX_LIVE - PRO_RESERVED;
}

// ⚠ Страничната лента НЯМА настройка. Единственият начин е командата
// workbench.action.closeSidebar, а тя се пуска само от разширение.
async function writeExtension(home) {
  const ext = join(home, '.local', 'share', 'code-server', 'extensions', 'cf-layout');
  await mkdir(ext, { recursive: true });

  await writeFile(join(ext, 'package.json'), JSON.stringify({
    name: 'cf-layout',
    publisher: 'codefast',
    version: '1.0.0',
    engines: { vscode: '^1.60.0' },
    activationEvents: ['*'],
    main: './extension.js',
    contributes: {},
  }, null, 2), 'utf8');

await writeFile(join(ext, 'extension.js'), `
const vscode = require('vscode');
function activate() {
  vscode.commands.executeCommand('workbench.action.closeSidebar');
}
exports.activate = activate;
exports.deactivate = function () {};
`.trim(), 'utf8');
}

async function prepare(home) {
  const cs = join(home, '.local', 'share', 'code-server');
  await mkdir(join(cs, 'User'), { recursive: true });
  await writeFile(join(cs, 'User', 'settings.json'), JSON.stringify(SETTINGS, null, 2), 'utf8');
  // Слепен път в coder.json прави „Workspace does not exist" при всяко отваряне.
  try { await rm(join(cs, 'coder.json')); } catch {}
  await writeExtension(home);
}

async function writeFiles(dir, files) {
  await mkdir(dir, { recursive: true });
  for (const [name, content] of Object.entries(files ?? {})) {
    if (name.includes('..') || name.startsWith('/')) continue;
    const full = join(dir, name);
    const sub = full.slice(0, full.lastIndexOf('/'));
    if (sub !== dir) await mkdir(sub, { recursive: true });
    await writeFile(full, String(content ?? ''), 'utf8');
  }
}

async function readFiles(dir) {
  const out = {};
  const walk = async (base, prefix) => {
    let items = [];
    try { items = await readdir(base, { withFileTypes: true }); } catch { return; }
    for (const it of items) {
      if (it.name.startsWith('.')) continue;
      const rel = prefix ? prefix + '/' + it.name : it.name;
      if (it.isDirectory()) await walk(join(base, it.name), rel);
      else { try { out[rel] = await readFile(join(base, it.name), 'utf8'); } catch {} }
    }
  };
  await walk(dir, '');
  return out;
}

async function isEmpty(dir) {
  try {
    const items = await readdir(dir);
    return items.filter((n) => !n.startsWith('.')).length === 0;
  } catch {
    return true;
  }
}

async function start(student, course, files, pro) {
  const key = keyOf(student, course);
  const name = nameOf(key);
  const home = join(ROOT, key);
  const dir = join(home, 'workspace');

  const existing = live.get(key);
  if (existing && await alive(name)) {
    existing.beat = Date.now();
    existing.pro = pro;
    return existing;
  }

  if (!room(pro)) {
    const e = new Error('full');
    e.full = true;
    throw e;
  }

  try { await docker(['rm', '-f', name]); } catch {}

  // Работата на ученика не се презаписва. Стартовите файлове влизат
  // само в празна папка — иначе изгасналият контейнер би изтрил всичко.
  if (await isEmpty(dir)) await writeFiles(dir, files ?? {});

  await prepare(home);
  await run('chown', ['-R', '1000:1000', home]);

  const port = await freePort();
  if (!port) throw new Error('no-free-port');

await docker([
    'run', '-d',
    '--name', name,
    '-p', port + ':8080',
    '-v', dir + ':/home/coder/project',
    '-v', join(home, '.local') + ':/home/coder/.local',
    '--memory=512m', '--cpus=0.5',
    '--pids-limit=256',
    IMAGE,
    '--auth', 'none',
    '--disable-telemetry',
    '--disable-workspace-trust',
    '--disable-update-check',
  ]);

  // Папката и файловете се задават през АДРЕСА, не през аргументи.
  // Аргументите се записват в coder.json и се разминават при повторно отваряне.
  const open = (await readdir(dir).catch(() => []))
    .filter((n) => !n.startsWith('.'))
    .filter((n) => /\.(html|css|js|json|md|txt|svg)$/i.test(n));

const query = '?folder=/home/coder/project';

 // ⚠ Режимът на преглед заменя таба вместо да добавя — изключен е в SETTINGS.
  const RANK = { 'index.html': 0, 'style.css': 1, 'script.js': 2 };
  const sorted = [...open].sort((a, b) => (RANK[a] ?? 9) - (RANK[b] ?? 9));
  // Входният файл се отваря пак накрая — само за да е избран, без да мести таба.
  const ordered = sorted.length ? [...sorted, sorted[0]] : [];
// Сокетът не е готов веднага. Чака се да се появи, вместо да се гадае време.
  (async () => {
    const sock = '/home/coder/.local/share/code-server/code-server-ipc.sock';
    let ready = false;
    for (let i = 0; i < 40; i++) {
      await new Promise((r) => setTimeout(r, 500));
      try {
        await docker(['exec', name, 'test', '-S', sock]);
        ready = true;
        break;
      } catch {}
    }
    if (!ready) return;

    await new Promise((r) => setTimeout(r, 2000));
    for (const n of ordered) {
      try {
        await docker(['exec', name, 'code-server', '--reuse-window', '/home/coder/project/' + n]);
      } catch {}
      await new Promise((r) => setTimeout(r, 1200));
    }
  })();

  const now = Date.now();
  const session = {
    key, name, port, dir, pro,
    url: 'http://' + HOST + ':' + port + query,
    beat: now, born: now,
  };
  live.set(key, session);
  return session;
}

let sweeps = 0;

setInterval(async () => {
  sweeps++;
  const now = Date.now();
  for (const [key, s] of live) {
    const life = s.pro ? LIFE_PRO_MS : LIFE_FREE_MS;
    if (now - s.beat > NO_BEAT_MS || now - s.born > life) {
      console.log('killing ' + key + ' sinceBeat=' + Math.round((now - s.beat) / 1000));
      await kill(key);
    }
  }
}, 15000);

function body(req) {
  return new Promise((res, rej) => {
    let d = '';
    req.on('data', (c) => { d += c; if (d.length > 4194304) rej(new Error('too-big')); });
    req.on('end', () => { try { res(d ? JSON.parse(d) : {}); } catch { rej(new Error('bad-json')); } });
  });
}

const send = (res, code, obj) => {
  res.writeHead(code, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type,x-token',
  });
  res.end(JSON.stringify(obj));
};

createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.headers['x-token'] !== TOKEN) return send(res, 401, { error: 'unauthorized' });

  try {
    if (req.method === 'POST' && req.url === '/session') {
      const { student, course, files, pro } = await body(req);
      if (!student || !course) return send(res, 400, { error: 'student-and-course-required' });
      try {
        const s = await start(String(student), String(course), files, !!pro);
        return send(res, 200, { url: s.url, port: s.port });
      } catch (e) {
        if (e.full) return send(res, 503, { error: 'full', used: live.size, max: MAX_LIVE });
        throw e;
      }
    }

    if (req.method === 'POST' && req.url === '/beat') {
      const { student, course } = await body(req);
      const s = live.get(keyOf(String(student), String(course)));
      if (s) s.beat = Date.now();
      return send(res, 200, { ok: !!s });
    }

    if (req.method === 'POST' && req.url === '/files') {
      const { student, course } = await body(req);
      const key = keyOf(String(student), String(course));
      const s = live.get(key);
      if (s) s.beat = Date.now();
      return send(res, 200, { files: await readFiles(join(ROOT, key, 'workspace')) });
    }

    if (req.method === 'POST' && req.url === '/stop') {
      const { student, course } = await body(req);
      await kill(keyOf(String(student), String(course)));
      return send(res, 200, { stopped: true });
    }

    if (req.method === 'GET' && req.url === '/health') {
      const now = Date.now();
      return send(res, 200, {
        live: live.size,
        max: MAX_LIVE,
        reserved: PRO_RESERVED,
        sweeps,
        sessions: [...live.values()].map((s) => ({
          key: s.key,
          pro: s.pro,
          port: s.port,
          sinceBeat: Math.round((now - s.beat) / 1000),
          age: Math.round((now - s.born) / 1000),
        })),
      });
    }

    send(res, 404, { error: 'not-found' });
  } catch (e) {
    send(res, 500, { error: String(e && e.message ? e.message : e) });
  }
}).listen(PORT, async () => { await adopt(); console.log('orchestrator on ' + PORT); });