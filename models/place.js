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

/**
 * Show all places
 *
 * @returns A promise to find all places
 */
const getAllPlaces = () => Place.find();

/**
 * Get a specific place
 *
 * @param number id The ID of the place to get
 * @returns A promise to get the specific place
 */
const getPlace = (id) => {
	if (!id) {
		throw Error('ID must be set');
	}
	return Place.findOne({ _id: id });
};

/**
 * Create a new Place
 *
 * @param Place newPlace The Place to create
 * @returns The promise for creating the new place
 */
const addPlace = (newPlace) => {
	if (!newPlace) {
		throw new Error('newPlace must be set');
	}
	return newPlace.save();
};

/**
 * Delete a place
 *
 * @param number id The ID of the place to delete
 * @returns A promise to delete the place
 */
const deletePlace = (id) => {
	if (!id) {
		throw Error('ID must be set');
	}

	return Place.findOneAndDelete({ _id: id });
};

/**
 * Update a place
 *
 * @param Object place Either a partial or full Place -- include _id and params to update
 * @param {boolean} [opts={ runValidator: true, new: true }]
 * @returns A promise to update the place
 */
const updatePlace = (place, opts = { runValidators: true, new: true }) => {
	if (!place) {
		throw Error('Place must be set');
	}

	return Place.findOneAndUpdate({ _id: place._id }, { $set: place }, opts);
};

module.exports = {
	Place,
	getPlace,
	getAllPlaces,
	addPlace,
	deletePlace,
	updatePlace,
};
