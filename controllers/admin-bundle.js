const express = require('express');
const router = express.Router();
const bundle = require('../models/bundle');
const util = require('util');

router.get('/', (req, res) => {
	res.send({succeeded: false, msg: 'Use api/ for GETs'});
});

router.post('/', (req, res) => {
	const reqBundle = req.body.newBundle;
	let errs = [];

	if (!reqBundle) {
		errs.push('Got no newBundle');
	}
	if (!reqBundle === {}) {
		errs.push('New bundle empty');
	}
	/* further validation could be added here... */
	if (errs.length) {
		res.send({succeeded: false, msg: errs});
	}

	const id = Math.random(Number.MAX_SAFE_INTEGER);
	const newBundle = new bundle.Bundle(reqBundle);
	newBundle._id = id;

	bundle.addBundle(newBundle).then((pl) => {
		res.send(pl)
	})
	.catch((err) => {
		res.status(500);
		res.send("Internal error.");
		console.error(err);
	});
});

router.put('/', (req, res) => {
	const incoming = req.body.bundle;
	if(!incoming || incoming === {}) {
		res.send('Bundle not set.');
	}

	bundle.updateBundle(incoming)
		.then((updatedBundle) => {
			res.send(updatedBundle);
		})
		.catch((err) => {
			res.status(500);
			res.send("Internal error.");
			console.error(err);
		});
});

router.delete('/:id', (req, res) => {
	const reqId = req.params.id;

	bundle.deleteBundle(reqId)
		.then(() => {
			res.send({succeeded: true});
		})
		.catch((err) => {
			res.status(500);
			res.send("Internal error");
		});
});

module.exports = router;
