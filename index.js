'use strict';

var http = require('http');
var routes = require('./app/routes');

http.createServer(function (req, res) {
	routes.invoke(req, res);
}).listen(8080);