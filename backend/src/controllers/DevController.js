const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
	async index(req, res) {
		const devs = await Dev.find();

		return res.json(devs);
	},

	async store(req, res) {
		const { login, techs, latitude, longitude } = req.body;

		let dev = await Dev.findOne({ login });

		if (!dev) {
			const response = await axios.get(`https://api.github.com/users/${login}`);

			const { name = login, id, avatar_url, bio } = response.data;

			const techsArray = parseStringAsArray(techs);

			const location = {
				type: 'Point',
				coordinates: [latitude, longitude]
			};

			dev = await Dev.create({
				_id: id,
				login,
				avatar: avatar_url,
				name,
				bio,
				techs: techsArray,
				location
			});
		}

		return res.json(dev);
	},

	async destroy(req, res) {
		const { _id } = req.params;
		await Dev.deleteOne({ github_username: _id });

		const devs = await Dev.find();
		return res.json(devs);
	}
};
