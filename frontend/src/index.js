import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
import { LogoSVG } from './components/Icons';

import api from './services/api';
import socket from './services/socket';

import './styles/Sidebar.scss';
import './styles/global.scss';
import './styles/Main.scss';
import './styles/App.scss';

function App() {
  const editDevMode = useState(null);
  const [devs, setDevs] = useState([]);

  // Carrega os Devs
  useEffect(() => {
    api.get('/devs').then((res) => setDevs(res.data));
  }, []);

  // Atualiza os dados do SocketIO
  useEffect(() => {
    socket
      .on('addDev', (value) => {
        if (!devs.some(({ _id }) => _id === value._id)) {
          setDevs([...devs, value]);
        }
      })
      .on('editDev', (value) => {
        setDevs(devs.map((dev) => (dev._id === value._id ? value : dev)));
      })
      .on('deleteDev', ({ _id }) => {
        setDevs(devs.filter(({ _id: devId }) => devId !== _id));
      });
  }, [devs]);

  return (
    <div id="app">
      <aside>
        <LogoSVG />
        <DevForm editMode={editDevMode} />
      </aside>

      <main>
        <ul>
          {devs.map((dev) => (
            <DevItem key={dev._id} dev={dev} onEdit={editDevMode} />
          ))}
        </ul>
      </main>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
