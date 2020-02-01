const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
	index(req, response) {
		Dev.find()
			.exec()
			.then(res => {
				response.json(res);
			});
	},

	async store(req, response) {
		const { login, techs, latitude, longitude } = req.body;

		await axios.get(`https://api.github.com/users/${login}`).then(async res => {
			const { name = login, id, avatar_url, bio } = res.data;

			await Dev.create({
				_id: id,
				login,
				avatar: avatar_url,
				name,
				bio,
				techs: parseStringAsArray(techs),
				location: {
					type: 'Point',
					coordinates: [latitude, longitude]
				}
			})
				.then(value => {
					response.json(value);
				})
				.catch(reason => {
					response.status(500).send(reason.errmsg);
				});
		});
	},

	async update(req, res) {
		const { id } = req.params;
		const { techs, latitude, longitude } = req.body;

		const oldDev = await Dev.findByIdAndUpdate(id, {
			techs: parseStringAsArray(techs),
			location: {
				type: 'Point',
				coordinates: [latitude, longitude]
			}
		});

		if (!oldDev) {
			return res.status(500).send();
		}

		return res.json(await Dev.findById(id));
	},

	async destroy(req, res) {
		const { id } = req.params;
		const deletedDev = await Dev.findByIdAndDelete(id);

		if (!deletedDev) {
			return res.status(500).send();
		}

		return res.json(deletedDev);
	}
};
