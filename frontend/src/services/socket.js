import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.7:3333');

export default (devs, setDevs) => {
  socket.on('addDev', value => {
    setDevs([...devs, value]);
  });

  socket.on('editDev', value => {
    setDevs(devs.map(dev => (dev._id === value._id ? value : dev)));
  });

  socket.on('deleteDev', value => {
    setDevs(devs.filter(({ _id }) => _id !== value._id));
  });
};
