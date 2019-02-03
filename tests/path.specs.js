process.env.NODE_ENV = 'test';

const chai = require('chai');
const mongoose = require('mongoose');
const path = require('../models/path');
const dbConfig = require('../config/database');

const expect = chai.expect;

mongoose.connect(dbConfig.database, dbConfig.opts);


describe("The Path Model's", () => {
	/* save a path for refence for cRUD */
	let testPath;
	/* assume there will never be an _id like this
	 * used to find/update/delete non-existing elements */
	const DOESNOTEXIST = -1;

	describe('create operations', () => {
		it('should be able to create a new Path', (done) => {
			const id = Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
			const newPath = new path.Path({
				name: 'Test',
				info: 'Test path',
				image: '',
				_id: id,
				length: 42,
				duration: 5,
				places: [1, 2, 3],
			});

			path.addPath(newPath)
				.then((pa) => {
					testPath = pa;
					done();
				}).catch((err) => {
					throw err;
				});
		});

		it('should not create a non-proper Path', (done) => {
			const newPath = new path.Path({
				name: 'Non-proper test path',
				info: 'This is a non-proper path',
			});

			path.addPath(newPath).catch(() => {
				done();
			});
		});

		it('should not create a Path that is null', (done) => {
			const newPath = null;
			const fnc = () => {
				path.addPath(newPath);
			};

			expect(fnc).to.throw('newPath must be set');
			done();
		});
	});

	describe('read operations', () => {
		it('should be able to find all Paths', (done) => {
			path.getAllPaths().then(done());
		});

		it('should be able to find a Path', (done) => {
			path.getPath(testPath.id).then((pa) => {
				if (testPath.id === pa.id) {
					done();
				}
			});
		});

		it('should not find a non-existing Path', (done) => {
			path.getPath(DOESNOTEXIST).then((pa) => {
				if (pa === null) {
					done();
				}
			});
		});
	});

	describe('update operations', () => {
		it('should properly update a Path', (done) => {
			const updates = { name: 'Updated test path' };
			path.updatePath(testPath.id, updates)
				.then((pa) => {
					if (pa.name === updates.name) {
						testPath = pa;
						done();
					}
				});
		});

		it('should not update a non-existing Path', (done) => {
			const updates = { name: 'Does not exist!' };
			path.updatePath(DOESNOTEXIST, updates)
				.then((pa) => {
					if (pa === null) {
						done();
					}
				});
		});

		it('should not update an existing Path with non-proper data', (done) => {
			const updates = { name: 4, length: 'NaN', duration: NaN };
			path.updatePath(testPath.id, updates)
				.catch((err) => {
					done();
				});
		});
	});

	describe('delete operations', () => {
		it('should properly delete a Path', (done) => {
			path.deletePath(testPath.id)
				.then(done());
		});

		it('should not delete a non-existing Path', (done) => {
			path.deletePath(DOESNOTEXIST)
				.then((pa) => {
					if (pa === null) {
						done();
					}
				});
		});
	});
});
