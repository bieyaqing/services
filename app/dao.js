'use strict';

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var MDB_URL = "mongodb://10.148.0.3:27017/ser_system";

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
				if(query._id) {
					if(validateId(query._id)) {
						query._id = new ObjectID(query._id);
					} else {
						callback({
							status: 0,
							message: "invalid object id"
						});
						return;
					}
				}
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
				if(validateId(obj._id)) {
					var query = {
						_id: new ObjectID(obj._id)
					};
					delete obj._id;
					db.collection(table).update(query, {$set: obj}, function(err, res) {
						if(err) {
							callback({
								status: 0,
								message: err
							});
						} else {
							// console.log(res.result.nModified + " record updated");
							db.close();
							callback({
								status: 1,
								data: obj
							});
						}
					});
				} else {
					callback({
						status: 0,
						message: "invalid object id"
					});
				}
			}
		});
	},
	delete: function(table, obj, callback) {
		MongoClient.connect(MDB_URL, function(err, db) {
			if(err) {
				callback({
					status: 0,
					message: err
				});
			} else {
				if(validateId(obj._id)) {
					var query = {
						_id: new ObjectID(obj._id)
					};
					db.collection(table).remove(query, function(err, res) {
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
				} else {
					callback({
						status: 0,
						message: "invalid object id"
					});
				}
			}
		});
	}
};

function validateId(id) {
	var result = false;
	var re = /[0-9A-Fa-f]{24}/g;
	if(re.test(id)) {
		result = true;
	} else {
		result = false;
	}
	re.lastIndex = 0;
	return result;
}