const express = require('express');

const router = express.Router();

const pixelboardService = require('../services/pixelboards');

router.use((req, res, next) => {
	console.log(`PIXELBOARD SERVICE - ${req.method} request for ${req.url}`);

	next();
});

router.get('/',
	async (req, res) => {
		const pixelboards = await pixelboardService.getPixelboards();

		res.send(pixelboards);
	});

router.get('/:id',
	async (req, res) => {
		const pixelboard = await pixelboardService.getPixelboard(req.params.id);

		res.send(pixelboard);
	});

router.post('/create',
	async (req, res) => {
		const createdPixelboard = await pixelboardService.createPixelboard(req.body);

		res.send(createdPixelboard);
	});

router.put('/:id/update',
	async (req, res) => {
		const updatedPixelboard = await pixelboardService.updatePixelboard(req.params.id, req.body);

		res.send(updatedPixelboard);
	});

router.delete('/:id/delete',
	async (req, res) => {
		const deletedPixelboard = await pixelboardService.deletePixelboard(req.params.id);

		res.send(deletedPixelboard);
	});

module.exports = router;
