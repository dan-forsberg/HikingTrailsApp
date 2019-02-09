/* Configuration details to connect to MongoDB */
let database = 'hikingtrails';
let host = 'ds213229.mlab.com';
let port = 13229;
let uname = 'hiker';
let pword = 'thisishiker1';

module.exports = {
	database: `mongodb://${uname}:${pword}@${host}:${port}/${database}`,
	opts: {
		useNewUrlParser: true
	}
};
