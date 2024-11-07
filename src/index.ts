import http from 'http';
import path from 'path';
import fs from 'fs/promises';
import url from 'url';

async function requestListener(req: http.IncomingMessage, res: http.ServerResponse) {
  const parsedUrl = url.parse(req.url || '', true);

  let data;
  let statusCode = 200;

  try {
    let pathName = parsedUrl.pathname;

    if (pathName === "/") pathName = '/index';

    const filePath = path.join(__dirname, `static${pathName}.html`);
    data = await fs.readFile(filePath, "utf-8");
  } catch {
    data = await fs.readFile(path.join(__dirname, 'static/404.html'), "utf-8");
    statusCode = 404;
  }

  res.writeHead(statusCode, { 'Content-Type': 'text/html', "content-length": data.length });
  res.write(data);
  res.end();
}

http.createServer(requestListener).listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});