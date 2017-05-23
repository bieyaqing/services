'use strict';

var MongoClient = require('mongodb').MongoClient;
var MDB_URL = "mongodb://localhost:27017/ser_system";

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