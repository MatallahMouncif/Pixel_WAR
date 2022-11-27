const User = require('../models/user');

const getUser = (body) => new Promise((resolve, reject) => {
	try {
		const user = User.findOne(
			{ name: body.name },
			{ email: body.email },
		);

		resolve(user);
	} catch (error) {
		reject(error);
	}
});

const signUp = (name, email, password) => new Promise((resolve, reject) => {
	try {
		const user = new User({
			name,
			email,
			password,
		});

		user.save();

		resolve(user);
	} catch (error) {
		reject(error);
	}
});

module.exports.getUser = getUser;
module.exports.signUp = signUp;
