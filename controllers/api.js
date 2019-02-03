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
			res.send(buns);
		})
		.catch((err) => {
			showError('getAllBundles', err, res);
		});
});

module.exports = router;
