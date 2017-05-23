'use strict';

var MongoClient = require('mongodb').MongoClient;
var MDB_URL = "mongodb://localhost:27017/ser_system";

module.exports = {
	create: function(table, obj, callback) {
		MongoClient.connect(MDB_URL, function(err, db) {
			if(err) {
				callback({
					status: 0,
					message: err
				});
			} else {
				db.collection(table).insertOne(obj, function(err, res) {
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
	},
	query: function(table, query, callback) {
		MongoClient.connect(MDB_URL, function(err, db) {
			if(err) {
				callback({
					status: 0,
					message: err
				});
			} else {
				db.collection(table).find(query).toArray(function(err, res) {
					if(err) {
						callback({
							status: 0,
							message: err
						});
					} else {
						db.close();
						callback({
							status: 1,
							data: res
						});
					}
				});
			}
		});
	},
	update: function(table, obj, callback) {
		MongoClient.connect(MDB_URL, function(err, db) {
			if(err) {
				callback({
					status: 0,
					message: err
				});
			} else {
				var query = {
					_id: obj._id
				};
				db.collection(table).update(query, obj, function(err, res) {
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
	},
	delete: function() {

	}
};