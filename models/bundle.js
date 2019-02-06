const mongoose = require('mongoose');
const util = require("util");

const bundleSchema = mongoose.Schema({
	_id: Number,
	name: { type: String, required: true },
	image: String,
	info: { type: String, required: true },
	paths: [Number],
},  { versionKey: false });

const Bundle = mongoose.model('Bundle', bundleSchema);

const addBundle = (newBundle) => {
	if (!newBundle) {
		throw new Error('newBundle must be set');
	}

	return newBundle.save();
};

const getAllBundles = () => Bundle.find();

const getBundle = (id) => {
	if (!id) {
		throw new Error('ID must be set');
	}

	return Bundle.findOne({ _id: id });
};

const updateBundle = (bundle, opts = { runValidator: true, new: true }) => {
	if (!bundle) {
		throw new Error('Bundle must be set');
	}

	return Bundle.findOneAndUpdate({ _id: bundle._id }, { $set: bundle }, opts);
};

const deleteBundle = (id) => {
	if (!id) {
		throw new Error('ID must be set');
	}

	return Bundle.findOneAndDelete({ _id: id });
};

module.exports = {
	Bundle, getBundle, getAllBundles, updateBundle, deleteBundle, addBundle,
};
