const fs = require('node:fs');

const getAllUsersFromJSON = () => new Promise((resolve, reject) => {
	fs.readFile(`${__dirname}/../data/users.json`, 'utf8', (err, data) => {
		if (err) {
			reject(new Error('Unable to get users'));
		}
		try {
			const parsed = JSON.parse(data);
			resolve(parsed);
		} catch (e) {
			reject(new Error(e));
		}
	});
});

module.exports.getAllUsersFromJSON = getAllUsersFromJSON;
