'use strict';

var os = require('os');

module.exports = {
	systemInfo: function(callback) {
		callback({
			status: 1,
			data: {
				server: "node.js",
				author: "Bie Yaqing",
				version: "0.0.1",
				platform: os.platform(),
				architecture: os.arch(),
				cpus: os.cpus(),
				freemem: os.freemem(),
				hostname: os.hostname()
			}
		});
	}
};