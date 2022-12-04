/* eslint-disable */
const bcrypt = require('bcryptjs');
const express = require('express');
const passport = require('passport');

const router = express.Router();
const signInService = require('../services/signIn');


router.use((req, res, next) => {
	console.log(`SIGNIN SERVICE - ${req.method} request for ${req.url}`);

	next();
});

router.post('/', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		if (!user) {
			return res.status(400).json({ error: info.message });
		}

		req.logIn(user, (err) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}

			return res.status(200).json({ message: 'Logged in' });
		});
	})(req, res, next);
});


module.exports = router;
