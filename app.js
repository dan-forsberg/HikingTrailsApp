/* App entry point */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dbConfig = require('./config/database');

const api = require('./controllers/api');
const adminApi = require('./controllers/admin-api');
const adminBundle = require('./controllers/admin-bundle');
const adminPath = require('./controllers/admin-path');
const adminPlace = require('./controllers/admin-place');

/*
 * Setup express
 */
const port = 3000;
const app = express();

app.use(cors());
// Add a JSON-parser, as any incoming data should be json
app.use(express.json({strict: false}));

/*
 * Set up API end-points
 */
app.use('/api', api);
app.use('/api/path', api);
app.use('/api/place', api);

app.use('/admin', adminApi);
app.use('/admin/bundle', adminBundle);
app.use('/admin/path', adminPath);
app.use('/admin/place', adminPlace);

/*
 * Setup index page
 * Right now, 'empty' page
 */
app.get('/', (req, res) => {
	res.send("There's nothing here yet!");
});

app.put('/', (req, res) => {
	res.send("There's nothing here yet!");
});

app.delete('/', (req, res) => {
	res.send("There's nothing here yet!");
});

app.post('/', (req, res) => {
	res.send("There's nothing here yet!");
});

/*
 * Setup mongoose and start server if everything went well
 */
mongoose.connect(dbConfig.database, dbConfig.opts, (err) => {
	if (err) {
		console.error('Mongoose unable to connect!');
		console.error(err);
		process.exit(1);
	}
});

const server = app.listen(port, () => {
	console.log(`[app] Starting server at port ${port}`);
});

/*
 * Allow for a more controlled shutdown, hook it to
 * SIGTERM and SIGKILL
 */
const gracefulShutdown = () => {
	console.log('[app] Shutting down...');
	mongoose.disconnect((err) => {
		if (err) {
			console.error(err);
		}
	});

	server.close(() => {
		process.exit();
	});

	setTimeout(() => {
		console.error('\tNot able to close connection in 5 sec - forcing shutdown');
		process.exit();
	}, 5000);
};

process.stdin.resume();
process.on('exit', gracefulShutdown);

/* Export the port for testing */
if (process.env.NODE_ENV === 'test') {
	module.exports = { port };
}
