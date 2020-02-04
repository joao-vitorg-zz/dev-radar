const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

const {
  handlerAddDev,
  handlerEditDev,
  handlerDeleteDev
} = require('../webSocket');

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
        const { name = login, id, blog, bio } = res.data;

        Dev.create({
          _id: id,
          login,
          avatar: `https://avatars2.githubusercontent.com/u/${id}?v=4&s=54`,
          name,
          bio,
          blog,
          techs: parseStringAsArray(techs),
          latitude,
          longitude
        })
          .then(value => {
            handlerAddDev(value);

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
        latitude,
        longitude
      },
      { new: true }
    )
      .exec()
      .then(value => {
        if (!value) {
          throw Error;
        }
        handlerEditDev(value);

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
        handlerDeleteDev(value);

        return res.json(value);
      });
  }
};
