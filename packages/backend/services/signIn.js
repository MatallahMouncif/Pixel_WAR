const fs = require('node:fs');

const isSigned = (email, password) => new Promise((resolve, reject) => {
	fs.readFile(`${__dirname}/../data/users.json`, 'utf8', (err, data) => {
		if (err) {
			reject(new Error('Unable to get users'));
		}

		try {
			// TODO: Replace with a real database
			const users = JSON.parse(data);

			users.forEach((user) => {
				const userEmail = user.email;
				const userPassword = user.password;

				if (userEmail === email && userPassword === password) {
					resolve(JSON.parse('{"isSigned": "true"}'));
				}
			});

			resolve(JSON.parse('{"isSigned": "false"}'));
		} catch (e) {
			reject(new Error(e));
		}
	});
});

module.exports.isSigned = isSigned;
