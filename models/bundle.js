const mongoose = require('mongoose');

const bundleSchema = mongoose.Schema({
	_id: Number,
	name: { type: String, required: true },
	image: String,
	info: { type: String, required: true },
	paths: [Number],
},  { versionKey: false });

const Bundle = mongoose.model('Bundle', bundleSchema);

/**
 * Create a new Bundle
 *
 * @param Bundle newBundle The Bundle to create
 * @returns The promise for creating the new bundle
 */
const addBundle = (newBundle) => {
	if (!newBundle) {
		throw new Error('newBundle must be set');
	}

	return newBundle.save();
};

/**
 * Show all bundles
 *
 * @returns A promise to find all bundles
 */
const getAllBundles = () => Bundle.find();

/**
 * Get a specific bundle
 *
 * @param number id The ID of the bundle to get
 * @returns A promise to get the specific bundle
 */
const getBundle = (id) => {
	if (!id) {
		throw new Error('ID must be set');
	}

	return Bundle.findOne({ _id: id });
};

/**
 * Update a bundle
 *
 * @param Object bundle Either a partial or full Bundle -- include _id and params to update
 * @param {boolean} [opts={ runValidator: true, new: true }]
 * @returns A promise to update the bundle
 */
const updateBundle = (bundle, opts = { runValidator: true, new: true }) => {
	if (!bundle) {
		throw new Error('Bundle must be set');
	}

	return Bundle.findOneAndUpdate({ _id: bundle._id }, { $set: bundle }, opts);
};

/**
 * Delete a bundle
 *
 * @param number id The ID of the bundle to delete
 * @returns A promise to delete the bundle
 */
const deleteBundle = (id) => {
	if (!id) {
		throw new Error('ID must be set');
	}

	return Bundle.findOneAndDelete({ _id: id });
};

module.exports = {
	Bundle, getBundle, getAllBundles, updateBundle, deleteBundle, addBundle,
};
