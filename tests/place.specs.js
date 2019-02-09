process.env.NODE_ENV = 'test';

const chai = require('chai');
const mongoose = require('mongoose');
const place = require('../models/place');
const dbConfig = require('../config/database');

const expect = chai.expect;

mongoose.connect(dbConfig.database, dbConfig.opts);

describe("The Place Model's", () => {
	/* save a place for refence for cRUD */
	let testPlace;
	/* assume there will never be an _id like this
	 * used to find/update/delete non-existing elements */
	const DEADBEEF = 'DEADBEEFDEADBEEFDEADBEEF';

	describe('create operations', () => {
		it('should be able to create a new Place', (done) => {
			const newPlace = new place.Place({
				name: 'Test',
				info: 'Test place',
				image: '',
				radius: 5,
				position: {
					lat: 42,
					lng: 3.14,
				},
			});

			place.addPlace(newPlace).then((pl) => {
				testPlace = pl;
				done();
			});
		});

		it('should not create a non-proper Place', (done) => {
			const newPlace = new place.Place({
				name: 'Non-proper test place',
				info: 'This is a non-proper place',
			});

			place.addPlace(newPlace).catch(() => {
				done();
			});
		});

		it('should not create a Place that is null', (done) => {
			const newPlace = null;

			const fnc = () => {
				place.addPlace(newPlace);
			};

			expect(fnc).to.throw('newPlace must be set');
			done();
		});
	});

	describe('read operations', () => {
		it('should be able to find all Places', (done) => {
			place.getAllPlaces()
				.then(done());
		});

		it('should be able to find a Place', (done) => {
			place.getPlace(testPlace.id)
				.then((pl) => {
					if (pl.id === testPlace.id) {
						done();
					}
				});
		});

		it('should not find a non-existing Place', (done) => {
			place.getPlace(DEADBEEF)
				.then((pl) => {
					if (pl == null) {
						done();
					}
				});
		});
	});

	describe('update operations', () => {
		it('should properly update a Place', (done) => {
			const updates = { _id: testPlace.id, name: 'Updated test place' };
			place.updatePlace(updates)
				.then((pl) => {
					if (pl.name === updates.name) {
						testPlace = pl;
						done();
					}
				});
		});

		it('should not update a non-existing Place', (done) => {
			const updates = { _id: DEADBEEF, name: 'Does not exist!' };
			place.updatePlace(updates)
				.then((pl) => {
					if (pl === null) {
						done();
					}
				});
		});

		it('should not update an existing Place with non-proper data', (done) => {
			const updates = { _id: testPlace.id, name: 4, radius: 'NaN' };
			place.updatePlace(updates)
				.catch((err) => {
					done();
				});
		});
	});

	describe('delete operations', () => {
		it('should properly delete a Place', (done) => {
			place.deletePlace(testPlace)
				.then(done());
		});

		it('should not delete a non-existing Place', (done) => {
			place.deletePlace(DEADBEEF)
				.then((pl) => {
					if (!pl) {
						done();
					}
				});
		});
	});
});
