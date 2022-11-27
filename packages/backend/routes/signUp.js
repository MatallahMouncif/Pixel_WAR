const bcrypt = require('bcryptjs');
const express = require('express');

const router = express.Router();

const signUpService = require('../services/signUp');

router.use((req, res, next) => {
	console.log(`SIGNUP SERVICE - ${req.method} request for ${req.url}`);

	next();
});

router.post('/',
	async (req, res) => {
		try {
			const user = await signUpService.getUser(req.body);

			if (user) {
				return res.status(400).send('User already exists');
			}

			const hashedPassword = bcrypt.hashSync(req.body.password, 8);

			const signedUp = await signUpService.signUp(req.body.name, req.body.email, hashedPassword);

			console.log(signedUp);

			return res.status(201).json({ message: 'User created' });
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	});

module.exports = router;
