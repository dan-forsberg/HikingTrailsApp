const express = require('express');
const router = express.Router();
const path = require('../models/path');

router.get('/', (req, res) => {
	res.send({succeeded: false, msg: 'Use api/ for GETs'});
});

router.post('/', (req, res) => {
	const reqPath = req.body.newPath;
	let errs = [];

	if (!reqPath) {
		errs.push('Got no newPath');
	}
	if (!reqPath === {}) {
		errs.push('New path empty');
	}
	/* further validation could be added here... */
	if (errs.length)
		res.send({succeeded: false, msg: errs});

	const newPath = new path.Path(reqPath);
	path.addPath(newPath).then((pl) => {
		res.send(pl)
	})
	.catch((err) => {
		res.status(500);
		res.send("Internal error.");
		console.error(err);
	});
});

router.put('/:id', (req, res) => {
	const reqId = req.params.id;
	const reqUpdates = req.body.updates;

	path.updatePath(reqId, reqUpdates)
		.then((updatedPath) => {
			res.send(updatedPath);
		})
		.catch((err) => {
			res.status(500);
			res.send("Internal error.");
			console.error(err);
		});
});

router.delete('/:id', (req, res) => {
	const reqId = req.params.id;

	path.deletePath(reqId)
		.then(() => {
			res.send({});
		})
		.err((err) => {
			res.status(500);
			res.send("Internal error");
		});
});

module.exports = router;
