import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import './styles.scss';

export default function DevForm({ editMode }) {
  const [editDev, setEditDev] = editMode;

  const [login, setLogin] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    if (!editDev) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const {
            latitude: currentLatitude,
            longitude: currentLongitude
          } = position.coords;

          setLatitude(currentLatitude);
          setLongitude(currentLongitude);
        },
        err => console.log(err.message),
        { enableHighAccuracy: true, timeout: 20000 }
      );
    } else {
      const {
        login: editDevLogin,
        techs: editDevTechs,
        latitude: editDevLatitude,
        longitude: editDevLongitude
      } = editDev;

      setLogin(editDevLogin);
      setTechs(editDevTechs.join(', '));
      setLatitude(editDevLatitude);
      setLongitude(editDevLongitude);
    }
  }, [editDev]);

  function handledAddDev() {
    api
      .post('/devs', {
        login,
        techs,
        latitude,
        longitude
      })
      .catch(() => {
        alert('Não foi possível criar o usuário');
      });
  }

  function handledEditDev() {
    const { _id } = editDev;

    api
      .put(`/devs/${_id}`, {
        techs,
        latitude,
        longitude
      })
      .catch(() => {
        alert('Não foi possível criar o usuário');
      });

    setEditDev(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!editDev) {
      handledAddDev();
    } else {
      handledEditDev();
    }

    setLogin('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="login">Usuário do Github</label>
        <input
          name="login"
          id="login"
          disabled={editDev}
          required
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologías</label>
        <input
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            name="latitude"
            type="number"
            id="latitude"
            required
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            name="longitude"
            type="number"
            id="longitude"
            required
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">{editDev ? 'Salvar' : 'Cadastrar'}</button>
    </form>
  );
}
