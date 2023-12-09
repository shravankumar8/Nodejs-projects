const http=require('node:http');
const hostname='127.0.0.1';
const port=3000;
const server=http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("234343")
})
server.listen(port,hostname,()=>{
    console.log(`server listening at http://${hostname}:${port}`)
});