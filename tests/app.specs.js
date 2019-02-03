process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

/* eslint in VS-code reports this as not-used -- this is false */
const should = chai.should();

const app = require('../app');

const url = `http://localhost:${app.port}`;

chai.use(chaiHttp);

describe('The first page', () => {
	it('should not error on a GET', (done) => {
		chai.request(url)
			.get('/')
			.end((err, res) => {
				res.status.should.be.equal(200);
				res.text.should.be.equal("There's nothing here yet!");
				done();
			});
	});

	it('should not error on a PUT', (done) => {
		chai.request(url)
			.put('/')
			.end((err, res) => {
				res.status.should.be.equal(200);
				res.text.should.be.equal("There's nothing here yet!");
				done();
			});
	});

	it('should not error on a POST', (done) => {
		chai.request(url)
			.post('/')
			.end((err, res) => {
				res.status.should.be.equal(200);
				res.text.should.be.equal("There's nothing here yet!");
				done();
			});
	});

	it('should not error on a DELETE', (done) => {
		chai.request(url)
			.delete('/')
			.end((err, res) => {
				res.status.should.be.equal(200);
				res.text.should.be.equal("There's nothing here yet!");
				done();
			});
	});
});
