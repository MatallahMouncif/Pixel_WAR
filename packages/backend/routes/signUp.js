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
			const { pseudo } = req.body;
			const { email } = req.body;
			const { password } = req.body;

			console.log(pseudo, email, password);

			await signUpService.signUp(pseudo, email, password);

			return res.status(201).json({ message: 'User created' });
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	});

module.exports = router;
