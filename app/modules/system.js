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
	}, createDatabase: function(callback) {
		MongoClient.connect(MDB_URL, function(err, db) {
			if (err) {
				callback({
					status: 0,
					message: err
				});
			} else {
				db.createCollection("accounts", function(err, res) {
					if (err) {
						callback({
							status: 0,
							message: "accounts not created"
						});
					} else {
						db.close();
						callback({
							status: 1,
							data: "database created"
						});
					}
				});
			}
		});
	}
};