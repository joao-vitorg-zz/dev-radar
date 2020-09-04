const socketio = require('socket.io');

let io;

exports.setupWebsocket = (server) => {
  io = socketio(server);
};

exports.handlerAddDev = (value) => {
  io.emit('addDev', value);
};

exports.handlerEditDev = (value) => {
  io.emit('editDev', value);
};

exports.handlerDeleteDev = (value) => {
  io.emit('deleteDev', value);
};
