process.env.NODE_ENV = 'test';

const chai = require('chai');
const mongoose = require('mongoose');
const bundle = require('../models/bundle');
const dbConfig = require('../config/database');

const expect = chai.expect;

mongoose.connect(dbConfig.database, dbConfig.opts);


describe("The Bundle Model's", () => {
	/* save a bundle for refence for cRUD */
	let testBundle;
	/* assume there will never be an _id like this
	 * used to find/update/delete non-existing elements */
	const DOESNOTEXIST = -1;

	describe('create operations', () => {
		it('should be able to create a new Bundle', (done) => {
			const id = Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
			const newBundle = new bundle.Bundle({
				name: 'Test',
				info: 'Test bundle',
				image: '',
				_id: id,
				paths: [1, 2, 3],
			});

			bundle.addBundle(newBundle)
				.then((bu) => {
					testBundle = bu;
					done();
				}).catch((err) => {
					throw err;
				});
		});

		it('should not create a non-proper Bundle', (done) => {
			const newBundle = new bundle.Bundle({
				name: 'Non-proper test bundle',
				info: 'This is a non-proper bundle',
			});

			bundle.addBundle(newBundle).catch(() => {
				done();
			});
		});

		it('should not create a Bundle that is null', (done) => {
			const newBundle = null;
			const fnc = () => {
				bundle.addBundle(newBundle);
			};

			expect(fnc).to.throw('newBundle must be set');
			done();
		});
	});

	describe('read operations', () => {
		it('should be able to find all Bundles', (done) => {
			bundle.getAllBundles().then(done());
		});

		it('should be able to find a Bundle', (done) => {
			bundle.getBundle(testBundle.id).then((bu) => {
				if (testBundle.id === bu.id) {
					done();
				}
			});
		});

		it('should not find a non-existing Bundle', (done) => {
			bundle.getBundle(DOESNOTEXIST).then((bu) => {
				if (bu === null) {
					done();
				}
			});
		});
	});

	describe('update operations', () => {
		it('should properly update a Bundle', (done) => {
			const updates = { name: 'Updated test bundle' };
			bundle.updateBundle(testBundle.id, updates)
				.then((bu) => {
					if (bu.name === updates.name) {
						testBundle = bu;
						done();
					}
				});
		});

		it('should not update a non-existing Bundle', (done) => {
			const updates = { name: 'Does not exist!' };
			bundle.updateBundle(DOESNOTEXIST, updates)
				.then((bu) => {
					if (bu === null) {
						done();
					}
				});
		});

		it('should not update an existing Bundle with non-proper data', (done) => {
			const updates = { paths: [NaN, NaN, 'Batman!'] };
			bundle.updateBundle(testBundle.id, updates)
				.catch((err) => {
					done();
				});
		});
	});

	describe('delete operations', () => {
		it('should properly delete a Bundle', (done) => {
			bundle.deleteBundle(testBundle.id)
				.then(done());
		});

		it('should not delete a non-existing Bundle', (done) => {
			bundle.deleteBundle(DOESNOTEXIST)
				.then((bu) => {
					if (bu === null) {
						done();
					}
				});
		});
	});
});
