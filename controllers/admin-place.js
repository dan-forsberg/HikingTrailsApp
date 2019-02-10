/*
Page: admin/place

Here any requests of creating, updating, or deleting of Places should come
*/

const express = require('express');
const router = express.Router();
const place = require('../models/place');

/*
Don't use admin/ for GET; use the api/
*/
router.get('/', (req, res) => {
	res.send({succeeded: false, msg: 'Use api/ for GETs'});
});

/*
Add a new place
According to spec, the place to add should be found in the JSON object
{ newPlace: { newplace... } }

If succesful it returns the newly created place, otherwise sends a non-descriptive
error to the user and logs to the console
*/
router.post('/', (req, res) => {
	const reqPlace = req.body.newPlace;
	let errs = [];

	if (!reqPlace) {
		errs.push('Got no newPlace');
	}
	if (!reqPlace === {}) {
		errs.push('New place empty');
	}
	/* further validation could be added here... */
	if (errs.length)
		res.send({succeeded: false, msg: errs});

	const newPlace = new place.Place(reqPlace);
	place.addPlace(newPlace).then((pl) => {
		res.send(pl)
	})
	.catch((err) => {
		res.status(500);
		res.send("Internal error.");
		console.error(err);
	});
});

/*
Update a place
According to spec it should be found in the JSON object
{ place: {place to update}}
It can be partial, or complete

If succesful send back whole updated place, otherwise send
a non-descriptive error the user and log to console
*/
router.put('/', (req, res) => {
	const incoming = req.body.place;

	place.updatePlace(incoming)
		.then((updatedPlace) => {
			res.send(updatedPlace);
		})
		.catch((err) => {
			res.status(500);
			res.send("Internal error.");
			console.error(err);
		});
});

/*
Delete a place
According to spec only the ID is required, and should be in the URL

If successful send a {succeeded:true}, otherwise non-descriptive error
and log to console
 */
router.delete('/:id', (req, res) => {
	const reqId = req.params.id;

	place.deletePlace(reqId)
		.then(() => {
			res.send({succeeded: true});
		})
		.catch((err) => {
			res.status(500);
			res.send("Internal error");
		});
});

module.exports = router;
