const fs = require('node:fs');

const signUp = (pseudo, email, password) => new Promise((resolve, reject) => {
	fs.readFile(`${__dirname}/../data/users.json`, 'utf8', (err, data) => {
		if (err) {
			reject(new Error('Unable to get users'));
		}

		try {
			// TODO: Replace with a database insertion
			console.log(pseudo, email, password);
			console.log(data);

			resolve();
		} catch (e) {
			reject(new Error(e));
		}
	});
});

module.exports.signUp = signUp;
