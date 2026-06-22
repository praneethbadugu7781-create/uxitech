const fs = require('fs');
const http = require('http');
const path = require('path');

const root = path.resolve(__dirname, '..', 'dist-web');
const port = Number(process.env.PORT || 4173);

const types = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

http
  .createServer((request, response) => {
    const requestPath = decodeURIComponent((request.url || '/').split('?')[0]);
    const relativePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
    let filePath = path.resolve(root, relativePath);

    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      filePath = path.resolve(root, 'index.html');
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.end('Not found');
        return;
      }

      response.writeHead(200, {
        'Content-Type': types[path.extname(filePath)] || 'application/octet-stream',
      });
      response.end(data);
    });
  })
  .listen(port, '127.0.0.1', () => {
    console.log(`UXI mobile preview: http://127.0.0.1:${port}`);
  });
