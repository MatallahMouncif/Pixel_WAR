const User = require('../models/user');

const getUsers = () => new Promise((resolve, reject) => {
	try {
		const users = User.find();

		resolve(users);
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

const getUsersNumber = () => new Promise((resolve, reject) => {
	try {
		const number = User.countDocuments();

		resolve(number);
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
module.exports.getUser = getUser;
module.exports.getUsersNumber = getUsersNumber;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
