const mongoose = require('mongoose');

const pathSchema = mongoose.Schema({
	_id: Number,
	image: String,
	name: {	type: String, required: true },
	info: { type: String, required: true },
	length: { type: String, required: true },
	duration: { type: Number, required: true },
	places: [String],
	/* no polyline, this is instead found in places.position the one source of truth */
});

const Path = mongoose.model('Path', pathSchema);

const addPath = (newPath) => {
	if (!newPath) {
		throw new Error('newPath must be set');
	}

	return newPath.save();
};

const getAllPaths = () => Path.find();

const getPath = (id) => {
	if (!id) {
		throw new Error('ID must be set');
	}
	return Path.findOne({ _id: id });
};

const updatePath = (id, updates, opts = { runValidators: true, new: true }) => {
	if (!id || !updates) {
		throw new Error('ID and updates must be set');
	}

	return Path.findOneAndUpdate({ _id: id }, { $set: updates }, opts);
};

const deletePath = (id) => {
	if (!id) {
		throw new Error('ID must be set');
	}
	return Path.findOneAndDelete({ _id: id });
};

module.exports = {
	Path, getPath, getAllPaths, updatePath, deletePath, addPath,
};
