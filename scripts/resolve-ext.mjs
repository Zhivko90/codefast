import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SRC = pathToFileURL(path.join(process.cwd(), 'src') + path.sep).href;

export async function resolve(specifier, context, nextResolve) {
  let spec = specifier;

  if (spec.startsWith('@/')) spec = SRC + spec.slice(2);

  try {
    return await nextResolve(spec, context);
  } catch (err) {
    const relative = spec.startsWith('.') || spec.startsWith('file:') || spec.startsWith(SRC);
    if (!relative || path.extname(spec)) throw err;

    for (const tail of ['.js', '.mjs', '/index.js']) {
      try {
        return await nextResolve(spec + tail, context);
      } catch {}
    }
    throw err;
  }
}