import http from 'http';
import { readFile } from 'fs/promises';
import { extname, join, normalize } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 8080;
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(req.url === '/' ? '/index.html' : req.url);
    const filePath = normalize(join(__dirname, urlPath));

    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    const data = await readFile(filePath);
    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404 - Pagina nao encontrada</h1>');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('========================================');
  console.log(' Landing Page - Dra. Helena Moreira');
  console.log('========================================');
  console.log(` Servidor rodando em: http://localhost:${PORT}`);
  console.log(' Ctrl+C para parar.');
  console.log('========================================');
});
