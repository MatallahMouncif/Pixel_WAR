const User = require('../models/user');

const getUser = (body) => new Promise((resolve, reject) => {
	try {
		const user = User.findOne({ name: body.name });

		resolve(user);
	} catch (error) {
		reject(error);
	}
});

module.exports.getUser = getUser;
