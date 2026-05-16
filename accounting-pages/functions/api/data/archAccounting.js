export async function onRequestGet(context) {
  try {
    const db = context.env.DB;
    
    // 讀取所有 chunks
    const rows = await db.prepare(
      "SELECT key, value FROM kv WHERE key LIKE 'archAccounting_%' ORDER BY key"
    ).all();
    
    if (!rows.results || rows.results.length === 0) {
      return new Response('{"projects":[],"payroll":[],"payables":[],"expenses":[]}', {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
    
    // 組合所有 chunks
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
    
    // 清除舊 chunks
    await db.prepare("DELETE FROM kv WHERE key LIKE 'archAccounting_%'").run();
    
    // 分塊存入
    const CHUNK_SIZE = 50000;
    const statements = [];
    for (let i = 0; i < body.length; i += CHUNK_SIZE) {
      const chunk = body.slice(i, i + CHUNK_SIZE);
      const key = `archAccounting_${Math.floor(i / CHUNK_SIZE)}`;
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
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
