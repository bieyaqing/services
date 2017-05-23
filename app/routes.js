'use strict';

var system = require('./modules/system');
var account = require('./modules/account');

module.exports = {
	invoke: function(method, path, input, callback) {
		if(mapping[path]) {
			var foo = mapping[path];
			if(foo[method]) {
				function response(data) {
					if(data.status == 1) {
						callback({
							status: 200,
							data: data.data
						});
					} else if(data.status == 0) {
						callback({
							status: 500,
							message: data.message
						});
					}
				}
				var bar = foo[method];
				eval(bar)
			} else {
				callback({
					status: 405,
					message: method + " method not allowed!"
				});
			}
		} else {
			callback({
				status: 404,
				message: "Service not found!"
			});
		}
	}
};

var mapping = {
	'/system': {
		'GET': 'system.systemInfo(response)'
	},
	'/accounts': {
		'POST': 'account.create(input, response)'
	}
};