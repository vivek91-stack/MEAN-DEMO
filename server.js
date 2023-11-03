const http = require('http');
const app = require('./Backend/app');
const debug = require("debug")("node-angular");
const port = process.env.PORT || 9500;

app.set('port', port);
const server = http.createServer(app);

server.listen(port);
