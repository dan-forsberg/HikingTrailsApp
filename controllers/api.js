process.env.NODE_ENV = 'test';

const express = require('express');
const router = express.Router();
const bundle = require('../models/bundle');
const path = require('../models/path');
const place = require('../models/place');

/* TODO: implement a better error handler... */
function showError(origin, err, res) {
	if (process.env.NODE_ENV === 'test') {
		res.send(`[${origin}] got error\n${err}`);
	} else {
		res.send({ success: false });
	}
}

/* When sending an empty GET, just show all bundles
 * To get more details, send the relevant request. */
router.get('/', (req,res) => {
	bundle.getAllBundles()
		.then((buns) => {
			if (buns)
				res.send(buns);
			else
				res.send({});
		})
		.catch((err) => {
			showError('getAllBundles', err, res);
		});
});

router.get('/path/:id', (req, res) => {
	path.getPath(req.params.id)
		.then((pa) => {
			if (pa)
				res.send(pa);
			else
				res.send({});
		})
		.catch((err) => {
			showError(`getPath with ID: ${req.params.id}`, err, res);
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
			showError(`getPath with ID: ${req.params.id}`, err, res);
		});
});

module.exports = router;
