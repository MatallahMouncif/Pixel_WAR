const bodyparser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = require('./config/db.config');

const pixelboards = require('./routes/pixelboards');
const signIn = require('./routes/signIn');
const signUp = require('./routes/signUp');

const app = express();
const PORT = 3003;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
	res.status(404).send('PixelWar Backend');
});

app.use('/pixelboards', pixelboards);
app.use('/sign-in', signIn);
app.use('/sign-up', signUp);

app.use((req, res, next, err) => {
	console.error(err.stack);

	if (res.headersSent) {
		return next(err);
	}

	return res.status(500).send('Something broke!');
});

const server = app.listen(PORT, () => {
	const { port } = server.address();

	console.log(`PixelWar Backend listening on http://localhost:${port}`);

	mongoose.connect(mongoString.url);

	const database = mongoose.connection;

	database.on('error', (error) => {
		console.log(error);
	});

	database.once('connected', () => {
		console.log('Connected to MongoDB');
	});
});
