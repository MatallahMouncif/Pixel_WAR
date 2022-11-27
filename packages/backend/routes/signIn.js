const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authConfig = require('../config/auth.config');
const signInService = require('../services/signIn');

router.use((req, res, next) => {
	console.log(`SIGNIN SERVICE - ${req.method} request for ${req.url}`);

	next();
});

router.post('/',
	async (req, res) => {
		try {
			const user = await signInService.getUser(req.body);

			if (!user) {
				return res.status(404).send('User not found');
			}

			console.log(req.body.password);
			console.log(user.password);

			const passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password,
			);

			console.log(passwordIsValid);

			/*
			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: 'Invalid Password!',
				});
			}
			*/

			const token = jwt.sign(
				{ id: user.id },
				authConfig.token,
				{
					expiresIn: 86400,
				},
			);

			return res.status(200).send({
				// eslint-disable-next-line no-underscore-dangle
				id: user._id,
				username: user.username,
				email: user.email,
				accessToken: token,
			});
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	});

module.exports = router;
