'use strict';

var passwordHash = require('password-hash');
var dao = require('../dao');
var table = 'accounts';

module.exports = {
	create: function(acc, callback) {
		var name = acc.name;
		var email = acc.email;
		var password = acc.password;
		if(name && email && password) {
			dao.query(table, {
				email: email
			}, function(data) {
				if(data.status) {
					if(data.data.length == 0) {
						var hash = passwordHash.generate(password);
						acc.hash = hash;
						delete acc.password;
						dao.create(table, acc, callback);
					} else {
						callback({
							status: 0,
							message: "account exist"
						});
					}
				} else {
					callback(data);
				}
			});
		} else {
			callback({
				status: 0,
				message: "invalid input"
			});
		}
	},
	read: function(input, callback) {
		var query = input;
		dao.query(table, query, callback);
	},
	update: function(acc, callback) {
		var name = acc.name;
		var email = acc.email;
		if(name && email) {
			dao.query(table, {
				email: email
			}, function(data) {
				if(data.status) {
					if(data.data.length == 0 || data.data[0]._id == acc._id) {
						dao.update(table, acc, callback);
					} else {
						callback({
							status: 0,
							message: "email exist"
						});
					}
				} else {
					callback(data);
				}
			});
		} else {
			callback({
				status: 0,
				message: "invalid input"
			});
		}
	},
	delete: function(input, callback) {
		var query = input;
		dao.delete(table, query, callback);
	},
	auth: function(input, callback) {
		var email = input.email;
		var password = input.password;
		if(email && password) {
			dao.query(table, {
				email: email
			}, function(data) {
				if(data.status) {
					if(data.data.length == 0) {
						callback({
							status: 0,
							message: "account not exist"
						});
					} else {
						var acc = data.data[0];
						if(passwordHash.verify(password, acc.hash)) {
							callback({
								status: 1,
								data: [acc]
							});
						} else {
							callback({
								status: 0,
								message: "password not correct"
							});
						}
					}
				} else {
					callback(data);
				}
			});
		} else {
			callback({
				status: 0,
				message: "invalid input"
			});
		}
	}
};
