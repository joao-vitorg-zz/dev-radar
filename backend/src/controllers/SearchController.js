const parseStringAsArray = require('../utils/parseStringAsArray');
const Dev = require('../models/Dev');

module.exports = {
	index(req, res) {
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

		Dev.find(
			techs ? { techs: { $in: parseStringAsArray(techs) }, ...near } : near
		)
			.exec()
			.then(value => {
				res.json(value);
			})
			.catch(reason => {
				res.status(500).json(reason.errmessage);
			});
	}
};
