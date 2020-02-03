const mongoose = require('mongoose');

module.exports = mongoose.model(
	'Dev',
	new mongoose.Schema({
		_id: { type: Number, required: true },

		login: { type: String, required: true },
		techs: { type: [String], required: true },
		location: {
			type: { type: String },
			coordinates: { type: [Number], required: true }
		},

		avatar: { type: String, required: true },
		name: { type: String, required: true },
		blog: { type: String },
		bio: { type: String }
	}).index({ location: '2dsphere' })
);
