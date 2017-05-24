'use strict';

var finalhandler = require('finalhandler');
var router = require('router');
var bodyParser = require('body-parser');
var system = require('./modules/system');
var account = require('./modules/account');

var router = router();
router.use(bodyParser.json());

module.exports = {
	invoke: function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		router(req, res, finalhandler(req, res));
	}
};

router.get('/system', function (req, res) {
	system.systemInfo(function(data) {
		responseBody(data, function(data) {
			res.write(JSON.stringify(data));
		});
		res.end();
	});
});

router.get('/accounts', function (req, res) {
	account.read({}, function(data) {
		responseBody(data, function(data) {
			res.write(JSON.stringify(data));
		});
		res.end();
	});
});

router.post('/accounts', function (req, res) {
	var input = req.body;
	account.create(input, function(data) {
		responseBody(data, function(data) {
			res.write(JSON.stringify(data));
		});
		res.end();
	});
});

router.get('/accounts/:_id', function (req, res) {
	var input = req.params;
	account.read(input, function(data) {
		responseBody(data, function(data) {
			res.write(JSON.stringify(data));
		});
		res.end();
	});
});

router.put('/accounts/:_id', function (req, res) {
	var params = req.params;
	var input = req.body;
	for(var k in params) {
		input[k] = params[k];
	}
	account.update(input, function(data) {
		responseBody(data, function(data) {
			res.write(JSON.stringify(data));
		});
		res.end();
	});
});

router.delete('/accounts/:_id', function (req, res) {
	var input = req.params;
	account.delete(input, function(data) {
		responseBody(data, function(data) {
			res.write(JSON.stringify(data));
		});
		res.end();
	});
});

function responseBody(data, callback) {
	if(data.status == 1) {
		callback({
			status: 200,
			data: data.data
		});
	} else if(data.status == 0) {
		callback({
			status: 202,
			message: data.message
		});
	}
}