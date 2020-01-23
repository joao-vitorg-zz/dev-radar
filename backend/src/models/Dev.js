const mongoose = require('mongoose');

const { Schema } = mongoose;

const DevSchema = new Schema({
	_id: Number,
	login: String,
	avatar: String,
	name: String,
	bio: String,

	techs: [String],
	location: {
		type: { type: String },
		coordinates: { type: [Number] }
	}
});

DevSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Dev', DevSchema);
