const express = require('express');

const router = express.Router();

const userService = require('../services/users');

router.use((req, res, next) => {
	console.log(`USERS SERVICE - ${req.method} request for ${req.url}`);

	next();
});

router.get('/',
	async (req, res) => {
		try {
			const users = await userService.getAllUsers();

			return res.json(users);
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	});

module.exports = router;
