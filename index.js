// 'use strict';

// var http = require('http');
// var routes = require('./app/routes');

// http.createServer(function (req, res) {
// 	routes.invoke(req, res);
// }).listen(8080);

'use strict';

const express = require('express');

const app = express();

var routes = require('./app/routes');

app.get('/*', (req, res) => {
	routes.invoke(req, res);
});

if (module === require.main) {
	const server = app.listen(process.env.PORT || 8080, () => {
		const port = server.address().port;
		console.log(`App listening on port ${port}`);
	});
}

module.exports = app;