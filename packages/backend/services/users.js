const bcrypt = require('bcryptjs');

const User = require('../models/user');

const getUsers = () => new Promise((resolve, reject) => {
	try {
		const users = User.find();

		resolve(users);
	} catch (error) {
		reject(error);
	}
});

const countUsers = () => new Promise((resolve, reject) => {
	try {
		const number = User.countDocuments();

		resolve(number);
	} catch (error) {
		reject(error);
	}
});

const getUser = (id) => new Promise((resolve, reject) => {
	try {
		const user = User.findById(id);

		resolve(user);
	} catch (error) {
		reject(error);
	}
});
const getUserByEmail = (email) => new Promise((resolve, reject) => {
	try {
		const user = User.findOne({ email });
		resolve(user);
	} catch (error) {
		reject(error);
	}
});

const createUser = (user) => new Promise((resolve, reject) => {
	try {
		const newUser = new User(user);

		newUser.save();

		resolve(newUser);
	} catch (error) {
		reject(error);
	}
});

const updateUser = (id, user) => new Promise((resolve, reject) => {
	try {
		const updatedUser = User.findOneAndUpdate(
			{ _id: id },
			{ $set: user },
			{ new: true },
		);

		resolve(updatedUser);
	} catch (error) {
		reject(error);
	}
});

const updateUserName = (id, name) => new Promise((resolve, reject) => {
	try {
		User.findOne(
			{ _id: id },
		).then((user) => {
			if (user) {
				const filter = {
					_id: id,
				};

				const update = {
					name: name.name,
				};

				User.findOneAndUpdate(
					filter,
					update,
					{ new: true },
				).then((updatedUser) => {
					resolve(updatedUser);
				});
			} else {
				resolve(false);
			}
		});
	} catch (error) {
		reject(error);
	}
});

const updateUserEmail = (id, email) => new Promise((resolve, reject) => {
	try {
		User.findOne(
			{ _id: id },
		).then((user) => {
			if (user) {
				const filter = {
					_id: id,
				};

				const update = {
					email: email.email,
				};

				User.findOneAndUpdate(
					filter,
					update,
					{ new: true },
				).then((updatedUser) => {
					resolve(updatedUser);
				});
			} else {
				resolve(false);
			}
		});
	} catch (error) {
		reject(error);
	}
});

const updateUserPassword = (id, password) => new Promise((resolve, reject) => {
	try {
		User.findOne(
			{ _id: id },
		).then((user) => {
			if (user) {
				const filter = {
					_id: id,
				};

				const newPassword = bcrypt.hashSync(password.password, 10);

				const update = {
					password: newPassword,
				};

				User.findOneAndUpdate(
					filter,
					update,
					{ new: true },
				).then((updatedUser) => {
					resolve(updatedUser);
				});
			} else {
				resolve(false);
			}
		});
	} catch (error) {
		reject(error);
	}
});

const deleteUser = (id) => new Promise((resolve, reject) => {
	try {
		const removedUser = User.findOneAndDelete(
			{ _id: id },
		);

		resolve(removedUser);
	} catch (error) {
		reject(error);
	}
});

module.exports.getUsers = getUsers;
module.exports.countUsers = countUsers;
module.exports.getUser = getUser;
module.exports.getUserByEmail = getUserByEmail;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.updateUserName = updateUserName;
module.exports.updateUserEmail = updateUserEmail;
module.exports.updateUserPassword = updateUserPassword;
module.exports.deleteUser = deleteUser;
