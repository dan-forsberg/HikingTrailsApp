/*
Page: admin/
No request should go here -- just send error messages.
*/

const express = require('express');
const router = express.Router();

function req_not_valid(req_type = null, msg = null) {
	return `{ succeeded: false, msg: 'Invalid request ${req_type}. ${msg}' }`;
}

router.get('/', (req, res) => {
	res.status(500);
	res.send(req_not_valid, 'GET', 'Use /api to show data instead.');
});
router.post('/', (req, res) => {
	res.status(500);
	res.send(req_not_valid, 'POST', 'Bundle, path, or place must be specified. Requires data to add.');
});
router.put('/', (req, res) => {
	res.status(500);
	res.send(req_not_valid('PUT', 'Bundle, path, or place must be specified, along with ID. Requires object of updates.'));
});
router.delete('/', (req, res) => {
	res.status(500);
	res.send(req_not_valid('DELETE', 'Bundle, path, or place must be specified, along with ID.'));
});

module.exports = router;
