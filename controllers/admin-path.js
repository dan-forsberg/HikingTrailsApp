/*
Page: admin/path

Here any requests of creating, updating, or deleting of Paths should come
*/

const express = require('express');
const router = express.Router();
const path = require('../models/path');

/*
Don't use admin/ for GET; use the api/
*/
router.get('/', (req, res) => {
	res.send({succeeded: false, msg: 'Use api/ for GETs'});
});

/*
Add a new path
According to spec, the path to add should be found in the JSON object
{ newPath: { newpath... } }

If succesful it returns the newly created path, otherwise sends a non-descriptive
error to the user and logs to the console
*/
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

	const id = Math.random(Number.MAX_SAFE_INTEGER);
	const newPath = new path.Path(reqPath);
	newPath._id = id;

	path.addPath(newPath).then((pl) => {
		res.send(pl)
	})
	.catch((err) => {
		res.status(500);
		res.send("Internal error.");
		console.error(err);
	});
});

/*
Update a path
According to spec it should be found in the JSON object
{ path: {path to update}}
It can be partial, or complete

If succesful send back whole updated path, otherwise send
a non-descriptive error the user and log to console
*/
router.put('/', (req, res) => {
	const incoming = req.body.path;
	if(!incoming || incoming === {}) {
		res.send("Path not set");
	}

	path.updatePath(incoming)
		.then((updatedPath) => {
			res.send(updatedPath);
		})
		.catch((err) => {
			res.status(500);
			res.send("Internal error.");
			console.error(err);
		});
});

/*
Delete a path
According to spec only the ID is required, and should be in the URL

If successful send a {succeeded:true}, otherwise non-descriptive error
and log to console
 */
router.delete('/:id', (req, res) => {
	const reqId = req.params.id;

	path.deletePath(reqId)
		.then(() => {
			res.send({succeeded: true});
		})
		.catch((err) => {
			res.status(500);
			res.send("Internal error");
		});
});

module.exports = router;
