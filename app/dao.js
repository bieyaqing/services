'use strict';

var MongoClient = require('mongodb').MongoClient;
var MDB_URL = "mongodb://localhost:27017/ser_system";

module.exports = {
	create: function(obj, callback) {
		MongoClient.connect(MDB_URL, function(err, db) {
			if(err) {
				callback({
					status: 0,
					message: err
				});
			} else {
				db.collection("accounts").insertOne(obj, function(err, res) {
					if(err) {
						callback({
							status: 0,
							message: err
						});
					} else {
						db.close();
						callback({
							status: 1,
							data: obj
						});
					}
				});
			}
		});
	}, query: function() {

	}, update: function() {

	}, delete: function() {

	}
};