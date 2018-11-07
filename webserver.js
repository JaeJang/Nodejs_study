const port = 1337;
const hostname = '127.0.0.1';

const http = require('http');

var server = http.createServer((req, res)=>{
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('Hello World\n');
});

server.listen(port, hostname, ()=>{
  console.log(`Server running at http://${hostname}:${port}/`);
});
