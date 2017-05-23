'use strict';

var system = require('./modules/system');

module.exports = {
	invoke: function(method, path, input) {
		if(mapping[path]) {
			var foo = mapping[path];
			if(foo[method]) {
				var bar = foo[method];
				return {
					status: 200,
					data: eval(bar)
				}
			} else {
				return {
					status: 404,
					message: "Service not found!"
				}
			}
		} else {
			return {
				status: 404,
				message: "Service not found!"
			}
		}
	}
};

var mapping = {
	'/system': {
		'GET': 'system.systemInfo()'
	}
};