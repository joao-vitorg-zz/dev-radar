const parseStringAsArray = require('../utils/parseStringAsArray');
const Dev = require('../models/Dev');

module.exports = {
	async index(req, res) {
		try {
			const { latitude, longitude, techs } = req.query;
			const techsArray = parseStringAsArray(techs);

			const devs = await Dev.find({
				techs: {
					$in: techsArray
				},
				location: {
					$near: {
						$geometry: {
							type: 'Point',
							coordinates: [latitude, longitude]
						},
						$maxDistance: 5000
					}
				}
			});

			res.json(devs);
		} catch (err) {
			res.status(500).send(err.message);
		}
	}
};
