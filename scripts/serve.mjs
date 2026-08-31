import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';

const root=resolve('dist');
const port=Number(process.env.PORT||4175);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.xml':'application/xml'};
createServer(async(req,res)=>{
  try{
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let target=resolve(root,'.'+pathname);
    if(target!==root&&!target.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    let info=await stat(target).catch(()=>null);
    if(info?.isDirectory())target=resolve(target,'index.html');
    else if(!info&&!extname(target))target+='.html';
    let content=await readFile(target).catch(()=>null);
    const status=content?200:404;
    if(!content){target=resolve(root,pathname.startsWith('/en/')?'en/404.html':'404.html');content=await readFile(target);}
    res.writeHead(status,{'Content-Type':types[extname(target)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(content);
  }catch{res.writeHead(400);res.end('Bad request');}
}).listen(port,'127.0.0.1',()=>console.log(`UrbanGO preview: http://127.0.0.1:${port}`));
