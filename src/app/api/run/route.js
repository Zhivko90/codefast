// Бекенд слой: приема код, праща го на Judge0 (base64), връща резултата.
// base64 гарантира, че кирилица и специални знаци не чупят заявката.

function toB64(str) {
  return Buffer.from(str ?? '', 'utf-8').toString('base64');
}
function fromB64(str) {
  if (!str) return '';
  return Buffer.from(str, 'base64').toString('utf-8');
}

export async function POST(request) {
  try {
    const { source_code, language_id, stdin } = await request.json();
    const url = process.env.JUDGE0_URL;
    const token = process.env.JUDGE0_TOKEN;

    const res = await fetch(`${url}/submissions?wait=true&base64_encoded=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': token,
      },
      body: JSON.stringify({
        source_code: toB64(source_code),
        language_id,
        stdin: toB64(stdin || ''),
      }),
    });

    const data = await res.json();

    return Response.json({
      stdout: fromB64(data.stdout),
      stderr: fromB64(data.stderr),
      compile_output: fromB64(data.compile_output),
      status: data.status,
      time: data.time,
      memory: data.memory,
    });
  } catch (error) {
    return Response.json({ error: 'Грешка: ' + error.message }, { status: 500 });
  }
}