// Pages Function: GET/POST monthlyExpenses
// Stores { mainData, empData, miscData, persData } across the same D1 kv table,
// using key prefix "monthlyExpenses_" (parallel to archAccounting_).
// Behaviour mirrors functions/api/data/archAccounting.js to stay consistent.

export async function onRequestGet(context) {
  try {
    const db = context.env.DB;
    const rows = await db.prepare(
      "SELECT key, value FROM kv WHERE key LIKE 'monthlyExpenses_%' ORDER BY key"
    ).all();
    if (!rows.results || rows.results.length === 0) {
      return new Response('{}', {
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

export async function onRequestPost(context) {
  try {
    const db = context.env.DB;
    const body = await context.request.text();
    // Clear old chunks
    await db.prepare("DELETE FROM kv WHERE key LIKE 'monthlyExpenses_%'").run();
    // Chunked insert
    const CHUNK_SIZE = 50000;
    const statements = [];
    for (let i = 0; i < body.length; i += CHUNK_SIZE) {
      const chunk = body.slice(i, i + CHUNK_SIZE);
      const key = `monthlyExpenses_${Math.floor(i / CHUNK_SIZE)}`;
      statements.push(
        db.prepare('INSERT INTO kv (key, value, updated_at) VALUES (?, ?, ?)')
          .bind(key, chunk, new Date().toISOString())
      );
    }
    await db.batch(statements);
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

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
