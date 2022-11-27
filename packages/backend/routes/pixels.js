const express = require('express');

const router = express.Router();

const pixelService = require('../services/pixels');

router.use((req, res, next) => {
	console.log(`PIXEL SERVICE - ${req.method} request for ${req.url}`);

	next();
});

router.post('/',
	async (req, res) => {
		const createdPixel = await pixelService.createPixel(req.body);

		res.send(createdPixel);
	});

router.put('/:id',
	async (req, res) => {
		const updatedPixel = await pixelService.updatePixel(req.params.id, req.body);

		res.send(updatedPixel);
	});

module.exports = router;
