import React, { useState, useEffect } from 'react';

import Routes from './src/routes';

import socket from './src/service/socket';
import api from './src/service/api';

export default () => {
  const editDevState = useState(null);
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    api.get('/devs').then(res => setDevs(res.data));
  }, []);

  useEffect(() => {
    socket
      .on('addDev', value => {
        if (!devs.some(({ _id }) => _id === value._id)) {
          setDevs([...devs, value]);
        }
      })
      .on('editDev', value => {
        setDevs(devs.map(dev => (dev._id === value._id ? value : dev)));
      })
      .on('deleteDev', ({ _id }) => {
        setDevs(devs.filter(({ _id: devId }) => devId !== _id));
      });
  }, [devs]);

  return <Routes screenProps={{ devs, editDevState }} />;
};
