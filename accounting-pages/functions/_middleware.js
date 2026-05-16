// Basic Auth middleware — runs on every request before Pages serves static assets or Functions.
//
// Credentials are read from Cloudflare Pages secrets/env vars, NOT hardcoded:
//   AUTH_PASSWORD   — required. Set with: wrangler pages secret put AUTH_PASSWORD --project-name=arch-accounting
//   AUTH_USER       — optional, defaults to "admin".
//
// To change the password later, just run the same wrangler command and enter a new value.
// If AUTH_PASSWORD is not set, the entire site returns 503 — fail-closed so the site is never
// accidentally left wide-open.
const DEFAULT_USER = 'admin';
const REALM = '會計系統';

function unauthorized() {
  return new Response('需要登入 (Authentication required)', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function misconfigured() {
  return new Response('Server is missing AUTH_PASSWORD secret. Run: wrangler pages secret put AUTH_PASSWORD', {
    status: 503,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export async function onRequest(context) {
  const { request, env, next } = context;

  // Always let CORS preflights through — fetch() doesn't send auth on OPTIONS.
  if (request.method === 'OPTIONS') return next();

  const expectedUser = env.AUTH_USER || DEFAULT_USER;
  const expectedPass = env.AUTH_PASSWORD;
  if (!expectedPass) return misconfigured();

  const header = request.headers.get('Authorization') || '';
  if (!header.startsWith('Basic ')) return unauthorized();

  let decoded;
  try {
    decoded = atob(header.slice(6).trim());
  } catch {
    return unauthorized();
  }

  const sep = decoded.indexOf(':');
  if (sep < 0) return unauthorized();
  const user = decoded.slice(0, sep);
  const pass = decoded.slice(sep + 1);
  if (user !== expectedUser || pass !== expectedPass) return unauthorized();

  return next();
}
