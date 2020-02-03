const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

module.exports = Router()
	.get('/devs', DevController.index)
	.post('/devs', DevController.store)
	.put('/devs/:id', DevController.update)
	.delete('/devs/:id', DevController.destroy)

	.get('/search', SearchController.index);
