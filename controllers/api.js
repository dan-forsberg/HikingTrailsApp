const express = require('express');
const router = express.Router();
const bundle = require('../models/bundle');
const path = require('../models/path');
const place = require('../models/place');

/*
 * Take an array of places, return $places.positions
 */
async function getPolyline(places) {
	let polyline = [];
	for (let i = 0; i < places.length; i++) {
		// place IDs will be in places
		// retrieve each place, store its .position into polyline
		// return it
		// this is *NOT* perfect or efficient
		await place.getPlace(places[i])
			.then((pl) => {
				polyline.push({positions: pl.position, radius: pl.radius});
			})
			.catch((err) => {
				console.error(err);
			});
	}
	return polyline;
}

/* When sending an empty GET, just show all bundles
 * To get more details, send the relevant request. */
router.get('/', (req, res) => {
	bundle.getAllBundles()
		.then((buns) => {
			res.send(buns);
		})
		.catch((err) => {
			console.error(err);
		});
});

router.get('/bundle/:id', (req, res) => {
	bundle.getBundle(req.params.id)
		.then((bun) => {
			res.send(bun);
		})
		.catch((err) => {
			console.err(err);
		});
});

router.get('/path', (req, res) => {
	path.getAllPaths()
		.then((pa) => {
			res.send(pa);
		})
		.catch((err) => {
			console.error(err);
		});
});

router.get('/place', (req, res) => {
	place.getAllPlaces()
		.then((pl) => {
			res.send(pl);
		})
		.catch((err) => {
			console.err(err);
		});
});

router.get('/path/:id', (req, res) => {
	path.getPath(req.params.id)
		.then((pa) => {
			/* defensive programming */
			if (!pa)
				res.send({});

			getPolyline(pa.places).then((polyline) => {
				pa.set({'polyline': polyline})
				res.send(pa);
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

router.get('/place/:id', (req, res) => {
	place.getPlace(req.params.id)
		.then((pl) => {
			if (pl)
				res.send(pl);
			else
				res.send({});
		})
		.catch((err) => {
			console.error(err);
		});
});

module.exports = router;
