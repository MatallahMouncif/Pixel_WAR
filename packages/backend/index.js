const express = require('express');

const cors = require('cors');

const userBACKEND = require('./routes/user');

const app = express();
const PORT = 3003;

app.use(cors());

app.get('/', (req, res) => {
	res.status(404).send('notFound');
});

app.use('/user', userBACKEND);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	console.error(err.stack);
	if (res.headersSent) {
		return next(err);
	}
	return res.status(500).send('Something broke!');
});

const server = app.listen(PORT, () => {
	const { port } = server.address();
	// eslint-disable-next-line no-console
	console.log(`Application started. Visit http://localhost:${port}`);
});
