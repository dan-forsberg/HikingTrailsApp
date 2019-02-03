/*
	This file is used to do manual testing with the controllers.
	It fills the test-db with a bundle consisting of a path, consisting
	of a few places. It's the same data as in the API-example

	This is in no-way safe from errors - there will be key collisions for example
	and it makes use of timeouts to get around mongoose being async. But its ONLY
	purpose is to save time when manually testing.
*/
process.env.NODE_ENV = 'test';

const bundle = require('../models/bundle');
const path = require('../models/path');
const place = require('../models/place');

const mongoose = require('mongoose');
const dbConfig = require('../config/database');

mongoose.connect(dbConfig.database, dbConfig.opts);
const places = [];
const paths = [];
const bundles = [];

function addPlaces() {
	const pls = [
		new place.Place({
			name: "Rest place one",
			info: "Look for it on the right side of the trail.",
			image: "http://www.vindelfjallen.se/wp-content/uploads/2012/05/UUUCgggY1.jpg",
			radius: 25,
			position: {
				lat: 63.82555200329026,
				lng: 20.26475965976715
			},
			media: [{
				type: "text",
				contents: "Anonymous hiker",
				name: "Credits",
				image: ""
			}]
		}),
		new place.Place({
			name: "Rest place two",
			info: "Look for it on the right side of the trail.",
			image: "http://www.vindelfjallen.se/wp-content/uploads/2012/05/UUUCgggY1.jpg",
			radius: 25,
			position: {
				lat: 63.82542895671274,
				lng: 20.265859365463257
			},
			media: [{
				type: "text",
				contents: "Anonymous hiker",
				name: "Credits",
				image: ""
			}]
		})
	];

	for (let i = 0; i < pls.length; i++) {
		let pl = pls[i];
		place.addPlace(pl)
			.then((p) => {
				places.push(p);
			})
			.catch((err) => {
				console.error("Unable to create place!");
				console.log(err);
			});
	}

	console.log("Added places.");
}

function addPaths() {
	const pths = [
		new path.Path({
			_id: 1234567890,
			name: "The northern circuit - trail one",
			info: "This first trail takes you along a set of Northern scenic views.",
			length: 4,
			places: [places[0]._id, places[1]._id],
			duration: 60,
			image: "http://assets.example.com/path-1234567890.jpg"
		}),
	];

	for (let i = 0; i < pths.length; i++) {
		let pa = pths[i];
		path.addPath(pa)
			.then((p) => {
				paths.push(p);
			})
			.catch((err) => {
				console.error("Unable to create path!");
				console.error(err)
			});
	}
}

function addBundles() {
	const buns = [new bundle.Bundle({
		_id: "1234567890",
		name: "The northern circuit",
		info: "This circuit paths take you along a set of Northern scenic views.",
		image: "http://assets.example.com/bundle-1234567890.jpg",
	})];

	for (let i = 0; i < buns.length; i++) {
		let bun = buns[i];
		bundle.addBundle(bun)
		.then((b) => {
			bundles.push(b);
		})
		.catch((err) => {
			console.error("Unable to create bundle!");
			console.error(err);
		});
	}
}

function addAll() {
	console.log("Adding places");
	addPlaces();

	setTimeout(() => {
		console.log("Adding paths");
		addPaths();
	}, 500);

	setTimeout(() => {
		console.log("Adding bundles");
		addBundles();
	}, 1000);

	setTimeout(() => {
		mongoose.disconnect();
	}, 1500);
}

addAll();

module.exports = { addPlaces, addPaths, addBundles, addAll };
