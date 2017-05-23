'use strict';

module.exports = {
	systemInfo: function(callback) {
		callback({
			status: 1,
			data: {
				server: "node.js",
				author: "Bie Yaqing",
				version: "0.0.1"
			}
		});
	}
};