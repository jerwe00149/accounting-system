// Auth middleware for accounting.zhang-arch.com (Cloudflare Pages Functions).
//
// Login-FORM + signed session cookie (replaces the old HTTP Basic Auth popup), so we can
// force a fresh login every time the user enters from the CCW hub: the hub links to
// /__logout, which clears the session and shows the login page again.
//
// Credentials come from Cloudflare Pages env (NOT hardcoded):
//   AUTH_PASSWORD — required. Set with: wrangler pages secret put AUTH_PASSWORD --project-name=arch-accounting
//   AUTH_USER     — optional, defaults to "admin".
// Fail-closed: if AUTH_PASSWORD is unset, the whole site returns 503.
//
// Session cookie "acct_sess" = "<expEpochMs>.<hmacHex>", signed with HMAC-SHA256 over
// "<user>|<exp>" keyed by AUTH_PASSWORD. Session-only cookie (cleared on browser close),
// hard-capped at SESSION_HOURS, and cleared by /__logout.

const DEFAULT_USER = 'admin';
const COOKIE = 'acct_sess';
const SESSION_HOURS = 8;
const ENC = new TextEncoder();

function misconfigured() {
  return new Response('Server is missing AUTH_PASSWORD secret. Run: wrangler pages secret put AUTH_PASSWORD', {
    status: 503,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

async function hmacHex(message, key) {
  const cryptoKey = await crypto.subtle.importKey(
    'raw', ENC.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, ENC.encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function makeToken(user, exp, key) {
  return `${exp}.${await hmacHex(`${user}|${exp}`, key)}`;
}

async function verifyToken(token, user, key) {
  if (!token) return false;
  const dot = token.indexOf('.');
  if (dot < 0) return false;
  const exp = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  if (!/^\d+$/.test(exp)) return false;
  if (Date.now() > Number(exp)) return false;
  const expected = await hmacHex(`${user}|${exp}`, key);
  if (mac.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < mac.length; i++) diff |= mac.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

function getCookie(request, name) {
  const raw = request.headers.get('Cookie') || '';
  for (const part of raw.split(/;\s*/)) {
    const eq = part.indexOf('=');
    if (eq > -1 && part.slice(0, eq) === name) return part.slice(eq + 1);
  }
  return null;
}

// Only allow same-origin absolute paths as redirect targets (block open-redirects).
function safeNext(v) {
  if (!v || !v.startsWith('/') || v.startsWith('//')) return '/';
  return v;
}

function wantsHtml(request) {
  const dest = request.headers.get('Sec-Fetch-Dest');
  if (dest) return dest === 'document' || dest === 'iframe';
  return (request.headers.get('Accept') || '').includes('text/html');
}

function loginPage(error, next, status = 200) {
  const safe = safeNext(next).replace(/"/g, '&quot;');
  const err = error ? `<p class="err">${error}</p>` : '';
  const html = `<!DOCTYPE html><html lang="zh-Hant"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>登入 — 會計系統</title><style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
font-family:'Microsoft JhengHei','PingFang TC','Noto Sans TC',sans-serif;background:#161513;color:#F0EBE0}
.card{width:340px;max-width:90vw;background:#1F1E1B;border:1px solid #3A3833;padding:34px 30px;border-radius:6px}
h1{font-size:22px;margin:0 0 4px}.sub{color:#76746E;font-size:13px;margin:0 0 22px}
label{display:block;font-size:13px;margin:14px 0 6px;color:#C5C0B5}
input{width:100%;padding:11px 12px;background:#161513;border:1px solid #3A3833;color:#F0EBE0;border-radius:4px;font-size:15px}
input:focus{outline:none;border-color:#D4654A}
button{width:100%;margin-top:22px;padding:12px;background:#D4654A;color:#fff;border:0;border-radius:4px;font-size:15px;font-weight:700;cursor:pointer}
button:hover{background:#c0543c}.err{color:#e88a7a;font-size:13px;margin:12px 0 0;text-align:center}
</style></head><body><form class="card" method="POST" action="/__login">
<h1>會計系統</h1><p class="sub">CCWarchistudio — 請登入</p>
<input type="hidden" name="next" value="${safe}">
<label>帳號</label><input name="username" autocomplete="username" autofocus required>
<label>密碼</label><input name="password" type="password" autocomplete="current-password" required>
${err}<button type="submit">登入</button></form></body></html>`;
  return new Response(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export async function onRequest(context) {
  const { request, env, next } = context;
  if (request.method === 'OPTIONS') return next();

  const url = new URL(request.url);
  const path = url.pathname;
  const user = env.AUTH_USER || DEFAULT_USER;
  const pass = env.AUTH_PASSWORD;
  if (!pass) return misconfigured();

  // Logout: clear session, send to login page. (CCW hub links here to force a fresh login.)
  if (path === '/__logout') {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/__login',
        'Set-Cookie': `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
        'Cache-Control': 'no-store',
      },
    });
  }

  // Login page (GET) + form submit (POST).
  if (path === '/__login') {
    const nxt = safeNext(url.searchParams.get('next'));
    if (request.method === 'POST') {
      let form;
      try { form = await request.formData(); } catch { return loginPage('表單讀取錯誤', nxt, 400); }
      const u = (form.get('username') || '').toString();
      const p = (form.get('password') || '').toString();
      const dest = safeNext((form.get('next') || '/').toString());
      if (u === user && p === pass) {
        const exp = Date.now() + SESSION_HOURS * 3600 * 1000;
        const token = await makeToken(user, exp, pass);
        return new Response(null, {
          status: 302,
          headers: {
            'Location': dest,
            // Session cookie (no Max-Age → cleared on browser close); hard-capped by signed exp.
            'Set-Cookie': `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax`,
            'Cache-Control': 'no-store',
          },
        });
      }
      return loginPage('帳號或密碼錯誤', dest, 401);
    }
    return loginPage('', nxt);
  }

  // Everything else requires a valid session cookie.
  const token = getCookie(request, COOKIE);
  if (token && (await verifyToken(token, user, pass))) return next();

  // Not authenticated: navigations → login page; API/fetch → 401 (don't feed HTML to fetch()).
  if (wantsHtml(request)) {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/__login?next=' + encodeURIComponent(path + url.search),
        'Cache-Control': 'no-store',
      },
    });
  }
  return new Response('需要登入 (Authentication required)', {
    status: 401,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
