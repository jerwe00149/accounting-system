// Pages Function: GET/POST receivables (extra tracking: dueDate + notes per project)
// Stored in the same D1 kv table with key prefix "receivables_".

export async function onRequestGet(context) {
  try {
    const db = context.env.DB;
    const rows = await db.prepare(
      "SELECT key, value FROM kv WHERE key LIKE 'receivables_%' ORDER BY key"
    ).all();
    if (!rows.results || rows.results.length === 0) {
      return new Response('[]', {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
    const data = rows.results.map(r => r.value).join('');
    return new Response(data, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

async function save(context) {
  try {
    const db = context.env.DB;
    const body = await context.request.text();
    await db.prepare("DELETE FROM kv WHERE key LIKE 'receivables_%'").run();
    const CHUNK_SIZE = 50000;
    const statements = [];
    for (let i = 0; i < body.length; i += CHUNK_SIZE) {
      const chunk = body.slice(i, i + CHUNK_SIZE);
      const key = `receivables_${Math.floor(i / CHUNK_SIZE)}`;
      statements.push(
        db.prepare('INSERT INTO kv (key, value, updated_at) VALUES (?, ?, ?)')
          .bind(key, chunk, new Date().toISOString())
      );
    }
    if (statements.length) await db.batch(statements);
    return new Response('{"success":true}', {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export async function onRequestPost(context) { return save(context); }
export async function onRequestPut(context) { return save(context); }

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
