const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const http = require('http');
const routes = require('./src/routes');
const { setupWebsocket } = require('./src/websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb://localhost:27017/week10', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

// kill `lsof -i TCP:3333 | grep LISTEN | awk '{ print $2 }'`

server.listen(3333);
