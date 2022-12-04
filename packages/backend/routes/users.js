/* eslint-disable consistent-return */
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

router.get('/me',
	async (req, res) => {
		try {
			await userService.getUser(req.user.id.toString()).then((signedInUser) => {
				if (req.isAuthenticated()) {
					return res.status(200).json(
						{
							id: signedInUser.id,
							name: signedInUser.name,
							email: signedInUser.email,
							role: signedInUser.role,
						},
					);
				}

				return res.status(401).json({ message: 'Unauthorized' });
			});
		} catch (err) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
	});

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.send('Logged out');
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

router.patch('/:id/update/name',
	async (req, res) => {
		const updatedUser = await userService.updateUserName(req.params.id, req.body);

		res.send(updatedUser);
	});

router.patch('/:id/update/email',
	async (req, res) => {
		const updatedUser = await userService.updateUserEmail(req.params.id, req.body);

		res.send(updatedUser);
	});

router.patch('/:id/update/password',
	async (req, res) => {
		const updatedUser = await userService.updateUserPassword(req.params.id, req.body);

		res.send(updatedUser);
	});

router.delete('/:id/delete',
	async (req, res) => {
		const deletedUser = await userService.deleteUser(req.params.id);

		res.send(deletedUser);
	});

module.exports = router;
