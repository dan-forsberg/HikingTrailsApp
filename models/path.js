const mongoose = require('mongoose');

const pathSchema = mongoose.Schema({
	_id: Number,
	image: String,
	name: {	type: String, required: true },
	info: { type: String, required: true },
	length: { type: String, required: true },
	duration: { type: Number, required: true },
	places: [String],
	polyline: [ mongoose.Mixed ]
},  { versionKey: false });

const Path = mongoose.model('Path', pathSchema);

/**
 * Create a new Path
 *
 * @param Path newPath The Path to create
 * @returns The promise for creating the new path
 */
const addPath = (newPath) => {
	if (!newPath) {
		throw new Error('newPath must be set');
	}

	return newPath.save();
};

/**
 * Show all paths
 *
 * @returns A promise to find all paths
 */
const getAllPaths = () => Path.find();

/**
 * Get a specific path
 *
 * @param number id The ID of the path to get
 * @returns A promise to get the specific path
 */
const getPath = (id) => {
	if (!id) {
		throw new Error('ID must be set');
	}
	return Path.findOne({ _id: id });
};

/**
 * Update a path
 *
 * @param Object path Either a partial or full Path -- include _id and params to update
 * @param {boolean} [opts={ runValidator: true, new: true }]
 * @returns A promise to update the path
 */
const updatePath = (path, opts = { runValidators: true, new: true }) => {
	if (!path) {
		throw new Error('Path must be set');
	}

	return Path.findOneAndUpdate({ _id: path._id }, { $set: path }, opts);
};

/**
 * Delete a path
 *
 * @param number id The ID of the path to delete
 * @returns A promise to delete the path
 */
const deletePath = (id, cb) => {
	if (!id) {
		throw new Error('ID must be set');
	}

	return Path.findOneAndRemove({ _id: id }, cb);
};

module.exports = {
	Path, getPath, getAllPaths, updatePath, deletePath, addPath
};
