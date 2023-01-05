const static = require('node-static');
const http = require('http');

const file = new(static.Server)(__dirname, {cache: 1});
const port = process.env.PORT
http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(port);
console.log('listening on', port)
