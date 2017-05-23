'use strict';

var dao = require('../dao');

module.exports = {
	create: function(acc, callback) {
		// TODO Validate account!
		dao.create(acc, callback);
	},
	read: function() {

	},
	update: function() {

	},
	delete: function() {

	}
};
