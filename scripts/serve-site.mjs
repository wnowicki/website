import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve(process.env.SITE_DIR || '_site');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff' };
createServer(async (request, response) => {
  try {
    const path = resolve(root, `.${decodeURIComponent(new URL(request.url, 'http://localhost').pathname)}`);
    if (path !== root && !path.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    for (const candidate of [path, `${path}/index.html`, `${path}.html`]) {
      if (!(await stat(candidate).catch(() => null))?.isFile()) continue;
      response.writeHead(200, { 'Content-Type': types[extname(candidate)] || 'application/octet-stream' });
      response.end(await readFile(candidate));
      return;
    }
    response.writeHead(404).end('Not found');
  } catch {
    response.writeHead(400).end('Bad request');
  }
}).listen(Number(process.env.PORT || 4173), '127.0.0.1');
