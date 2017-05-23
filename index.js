'use strict';

var http = require('http');
var routes = require('./app/routes');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
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
			resData = routes.invoke(method, url, body);
			res.write(JSON.stringify(resData));
			res.end();
		});
	} else {
		resData = routes.invoke(method, url);
		res.write(JSON.stringify(resData));
		res.end();
	}
}).listen(8080);