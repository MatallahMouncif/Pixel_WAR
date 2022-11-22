const express = require('express');

const router = express.Router();

const loginService = require('../services/login');

router.use((req, res, next) => {
	console.log(`LOGIN SERVICE - ${req.method} request for ${req.url}`);

	next();
});

router.post('/',
	async (req, res) => {
		try {
			const { email } = req.body;
			const { password } = req.body;

			const login = await loginService.getToken(email, password);

			return res.json(login);
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	});

module.exports = router;
