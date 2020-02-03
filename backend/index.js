const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/week10', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
