const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Dev',
  new mongoose.Schema({
    _id: { type: Number, required: true },

    login: { type: String, required: true },
    techs: { type: [String], required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },

    avatar: { type: String, required: true },
    name: { type: String, required: true },
    blog: { type: String },
    bio: { type: String },
  })
);
