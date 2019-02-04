/* Configuration details to connect to MongoDB */
let database = 'hikingtrails';
let host = 'localhost';
let port = 27017;

module.exports = {
	database: `mongodb://${host}:${port}/${database}`,
	opts: {
		useNewUrlParser: true
	}
};
