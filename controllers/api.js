/*
Page: api/
Show all data for bundle/place/path
*/
const express = require('express');
const router = express.Router();
const bundle = require('../models/bundle');
const path = require('../models/path');
const place = require('../models/place');

/**
 * Generate a polyline object based on array of places
 *
 * @param Place[] places
 * @returns An array of {lng: x, lat: y}
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

/*
When sending an empty GET, just show all bundles
To get more details, send the relevant request
*/
router.get('/', (req, res) => {
	bundle.getAllBundles()
		.then((buns) => {
			res.send(buns);
		})
		.catch((err) => {
			console.error(err);
		});
});

/*
When sending a GET to bundle/5, show all the data for bundle #5
*/
router.get('/bundle/:id', (req, res) => {
	bundle.getBundle(req.params.id)
		.then((bun) => {
			res.send(bun);
		})
		.catch((err) => {
			console.err(err);
		});
});

/*
Show all paths
 */
router.get('/path', (req, res) => {
	path.getAllPaths()
		.then((pa) => {
			res.send(pa);
		})
		.catch((err) => {
			console.error(err);
		});
});

/*
Show all places
 */
router.get('/place', (req, res) => {
	place.getAllPlaces()
		.then((pl) => {
			res.send(pl);
		})
		.catch((err) => {
			console.err(err);
		});
});

/*
Show data for the specified path
 */
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

/*
Show data for the specified place
*/
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
