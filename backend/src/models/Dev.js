const mongoose = require('mongoose');

module.exports = mongoose.model(
	'Dev',
	new mongoose.Schema({
		_id: { type: Number, required: true },

		login: { type: String, required: true },
		techs: { type: [String], required: true },
		location: {
			type: { type: String },
			coordinates: { type: [Number] }
		},

		avatar: { type: String, required: true },
		name: { type: String, required: true },
		bio: { type: String, required: true }
	}).index({ location: '2dsphere' })
);
