const parseStringAsArray = require('../utils/parseStringAsArray');
const Dev = require('../models/Dev');

module.exports = {
	async index(req, res) {
		const { latitude, longitude, techs } = req.query;

		const near = {
			location: {
				$near: {
					$geometry: {
						type: 'Point',
						coordinates: [latitude, longitude]
					},
					$maxDistance: 5000
				}
			}
		};

		try {
			res.json(
				await Dev.find(
					techs ? { techs: { $in: parseStringAsArray(techs) }, ...near } : near
				)
			);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}
};
