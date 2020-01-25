const mongoose = require('mongoose');

const { Schema } = mongoose;

const DevSchema = new Schema({
	_id: { type: Number, required: true },
	login: { type: String, required: true },

	avatar: { type: String, required: true },
	name: { type: String, required: true },
	bio: { type: String, required: true },

	techs: { type: [String], required: true },
	location: {
		type: { type: String },
		coordinates: { type: [Number] }
	}
});

DevSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Dev', DevSchema);
