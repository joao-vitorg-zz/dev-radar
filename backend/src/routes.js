const { Router } = require('express');
const DevController = require('./controllers/DevController');

module.exports = Router()
  .get('/devs', DevController.index)
  .post('/devs', DevController.store)
  .put('/devs/:id', DevController.update)
  .delete('/devs/:id', DevController.destroy);
