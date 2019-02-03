const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
	name: { type: String, required: true },
	info: { type: String, required: true },
	image: String,
	radius: { type: Number, required: true },
	position: {
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},
	media: [Object],
}, { versionKey: false });

const Place = mongoose.model('Place', placeSchema);

const getAllPlaces = () => Place.find();

const getPlace = (id) => {
	if (!id) {
		throw Error('ID must be set');
	}
	return Place.findOne({ _id: id });
};

const addPlace = (newPlace) => {
	if (!newPlace) {
		throw new Error('newPlace must be set');
	}
	return newPlace.save();
};

const deletePlace = (id) => {
	if (!id) {
		throw Error('ID must be set');
	}

	return Place.findOneAndDelete({ _id: id });
};

const updatePlace = (id, updates, opts = { runValidators: true, new: true }) => {
	if (!id || !updates) {
		throw Error('ID and updates must be set');
	}

	return Place.findOneAndUpdate({ _id: id }, { $set: updates }, opts);
};

module.exports = {
	Place,
	getPlace,
	getAllPlaces,
	addPlace,
	deletePlace,
	updatePlace,
};
