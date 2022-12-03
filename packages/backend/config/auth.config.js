/* eslint-disable */
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function (passport) {
	passport.use(
		new localStrategy({ usernameField: 'email' }, (email, password, done) => {
			User.findOne({ email: email }, (err, user) => {
				if (err) throw err;
				if (!user) return done(null, false, { message: 'That email is not registered' });
				bcrypt.compare(password, user.password, (err, result) => {
					if (err) throw err;
					if (result === true) {
						return done(null, user);
					} else {
						return done(null, false, { message: 'Password incorrect' });
					}
				});
			}
			)
		}));
	passport.serializeUser((user, cb) => {
		cb(null, user.id);
	});
	passport.deserializeUser((id, cb) => {
		User.findOne({ _id: id }, (err, user) => {
			const userInformation = {
				id: user._id,
				email: user.email,
				role: user.role,
			};
			cb(err, userInformation);
		})
	});
};
