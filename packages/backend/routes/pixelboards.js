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
		console.log(req.params.id);

		const pixelboard = await pixelboardService.getPixelboard(req.params.id);

		res.send(pixelboard);
	});

module.exports = router;
