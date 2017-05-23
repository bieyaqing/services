'use strict';

var http = require('http');
var routes = require('./app/routes');

http.createServer(function (req, res) {
	var headers = req.rawHeaders;
	if(headers.indexOf('Content-Type') != -1) {
		// console.log(headers[headers.indexOf('Content-Type') + 1]);	
	}
	var method = req.method;
	var url = req.url;
	var resData;
	if(method == 'POST' || method == 'PUT') {
		var body = "";
		req.on('data', function (data) {
			body += data;
			if (body.length > 1e6) {
				req.connection.destroy();
			}
		});
		req.on('end', function () {
			body = JSON.parse(body);
			routes.invoke(method, url, body, function(data) {
				res.writeHead(data.status, {'Content-Type': 'application/json'});
				res.write(JSON.stringify(data));
				res.end();
			});
		});
	} else {
		resData = routes.invoke(method, url, undefined, function(data) {
			res.writeHead(data.status, {'Content-Type': 'application/json'});
			res.write(JSON.stringify(data));
			res.end();
		});
	}
}).listen(8080);