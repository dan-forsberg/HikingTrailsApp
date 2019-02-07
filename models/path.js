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

const updatePath = (path, opts = { runValidators: true, new: true }) => {
	if (!path) {
		throw new Error('Path must be set');
	}

	return Path.findOneAndUpdate({ _id: path._id }, { $set: path }, opts);
};

const deletePath = (id, cb) => {
	if (!id) {
		throw new Error('ID must be set');
	}

	return Path.findOneAndRemove({ _id: id }, cb);
};

module.exports = {
	Path, getPath, getAllPaths, updatePath, deletePath, addPath
};
