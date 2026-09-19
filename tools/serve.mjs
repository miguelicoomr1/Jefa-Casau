import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.ico':'image/x-icon','.webmanifest':'application/manifest+json'};
http.createServer((req,res)=>{
  const target = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if (!target.startsWith(root) || target.includes(path.sep+'.git')) {res.writeHead(403).end(); return;}
  const file = target.endsWith(path.sep) || target === path.resolve(root) ? path.join(target,'index.html') : target;
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(data);});
}).listen(5177,'127.0.0.1',()=>console.log('CLIMATSOL: http://127.0.0.1:5177'));
