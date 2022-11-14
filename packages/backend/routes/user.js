const express = require('express');
const userService = require('../services/user');

const router = express.Router();

router.use((req, res, next) => {
	// eslint-disable-next-line no-console
	console.log(`USER BACKEND - ${req.method} request for ${req.url}`);
	next();
});

router.get('/',
	async (req, res) => {
		const users = [
			{
				id: 1,
				name: 'John Doe',
			},
			{
				id: 2,
				name: 'Jane Doe',
			},
		];
		return res.json(users);
	});

router.get('/data',
	async (req, res) => {
		try {
			const users = await userService.getAllUsersFromJSON();
			return res.json(users);
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	});

module.exports = router;
