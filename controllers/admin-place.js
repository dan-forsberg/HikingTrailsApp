const express = require('express');
const router = express.Router();
const place = require('../models/place');

router.get('/', (req, res) => {
	res.send({succeeded: false, msg: 'Use api/ for GETs'});
});

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

module.exports = router;
