const express = require('express');

const router = express.Router();

const userService = require('../services/users');

router.use((req, res, next) => {
	console.log(`USERS SERVICE - ${req.method} request for ${req.url}`);

	next();
});

router.get('/',
	async (req, res) => {
		const users = await userService.getUsers();

		res.send(users);
	});

router.get('/count',
	async (req, res) => {
		const count = await userService.countUsers();

		res.send({ count });
	});

router.get('/:id',
	async (req, res) => {
		const user = await userService.getUser(req.params.id);

		res.send(user);
	});

router.post('/create',
	async (req, res) => {
		const createdUser = await userService.createUser(req.body);

		res.send(createdUser);
	});

router.put('/:id/update',
	async (req, res) => {
		const updatedUser = await userService.updateUser(req.params.id, req.body);

		res.send(updatedUser);
	});

router.delete('/:id/delete',
	async (req, res) => {
		const deletedUser = await userService.deleteUser(req.params.id);

		res.send(deletedUser);
	});

module.exports = router;
