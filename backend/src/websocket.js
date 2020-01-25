const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = server => {
	io = socketio(server);

	io.on('connection', socket => {
		const { latitude, longitude, techs } = socket.handshake.query;

		connections.push({
			id: socket.id,
			coordinates: {
				latitude: Number(latitude),
				longitude: Number(longitude)
			},
			techs: parseStringAsArray(techs)
		});
	});
};

exports.findConnectionsAndSendMessage = (dev, message) => {
	const { location, techs } = dev;

	connections
		.filter(connection => {
			return (
				calculateDistance(location.coordinates, connection.coordinates) < 10 &&
				connection.techs.some(item => techs.includes(item))
			);
		})
		.forEach(connection => {
			io.to(connection.id).emit(message, dev);
		});
};
