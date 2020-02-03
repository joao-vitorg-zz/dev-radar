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

	store(req, response) {
		const { login, techs, latitude, longitude } = req.body;

		axios
			.get(`https://api.github.com/users/${login}`)
			.then(res => {
				const { name = login, id, avatar_url, bio } = res.data;

				Dev.create({
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
			})
			.catch(() => {
				response.status(500).send('Usuário inexistente');
			});
	},

	update(req, response) {
		const { id } = req.params;
		const { techs, latitude, longitude } = req.body;

		Dev.findByIdAndUpdate(
			id,
			{
				techs: parseStringAsArray(techs),
				location: {
					type: 'Point',
					coordinates: [latitude, longitude]
				}
			},
			{ new: true }
		)
			.exec()
			.then(value => {
				if (!value) {
					throw Error;
				}

				response.json(value);
			})
			.catch(() => {
				response.status(500).send('Usuário inexistente');
			});
	},

	destroy(req, res) {
		const { id } = req.params;

		Dev.findByIdAndDelete(id)
			.exec()
			.then(value => {
				if (!value) {
					return res.status(500).send('Usuário inexistente');
				}

				return res.json(value);
			});
	}
};
