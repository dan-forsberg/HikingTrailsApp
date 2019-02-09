/*
Page: admin/bundle

Here any requests of creating, updating, or deleting of Bundles should come
*/

const express = require('express');
const router = express.Router();
const bundle = require('../models/bundle');
const util = require('util');

/*
Don't use admin/ for GET; use the api/
*/
router.get('/', (req, res) => {
	res.send({succeeded: false, msg: 'Use api/ for GETs'});
});

/*
Add a new bundle
According to spec, the bundle to add should be found in the JSON object
{ newBundle: { newbundle... } }

If succesful it returns the newly created bundle, otherwise sends a non-descriptive
error to the user and logs to the console
*/
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

	/* randomize an ID */
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

/*
Update a bundle
According to spec it should be found in the JSON object
{ bundle: {bundle to update}}
It can be partial, or complete

If succesful send back whole updated bundle, otherwise send
a non-descriptive error the user and log to console
*/
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

/*
Delete a bundle
According to spec only the ID is required, and should be in the URL

If successful send a {succeeded:true}, otherwise non-descriptive error
and log to console
 */
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
