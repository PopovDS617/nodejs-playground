const http = require('http');
const routes = require('./routes');

// http.createServer(function(req,res));
// http.createServer((req,res)=>{});

const server = http.createServer(routes.handler);

server.listen(3000);
