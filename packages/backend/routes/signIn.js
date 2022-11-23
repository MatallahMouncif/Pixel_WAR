const express = require('express');

const router = express.Router();

const signInService = require('../services/signIn');

router.use((req, res, next) => {
	console.log(`SIGNIN SERVICE - ${req.method} request for ${req.url}`);

	next();
});

router.post('/',
	async (req, res) => {
		try {
			const { email } = req.body;
			const { password } = req.body;

			const isSigned = await signInService.isSigned(email, password);

			return res.json(isSigned);
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	});

module.exports = router;
