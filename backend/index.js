const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const http = require('http');

const routes = require('./src/routes');
const { setupWebsocket } = require('./src/webSocket');

mongoose.connect(`mongodb://localhost:27017/week10`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();
const server = http.Server(app);
setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
