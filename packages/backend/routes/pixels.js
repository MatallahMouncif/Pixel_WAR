const express = require('express');

const router = express.Router();

const pixelService = require('../services/pixels');

router.use((req, res, next) => {
	console.log(`PIXEL SERVICE - ${req.method} request for ${req.url}`);

	next();
});

router.get('/author/:author_id',
	async (req, res) => {
		const myPixels = await pixelService.getMyPixels(req.params.author_id);

		res.send(myPixels);
	});

router.post('/',
	async (req, res) => {
		const myPixel = await pixelService.createPixel(req.body);
		if (myPixel === false) {
			res.status(404).send('Cant draw yet');
		} else {
			res.send(myPixel);
		}
	});

router.put('/:id',
	async (req, res) => {
		const updatedPixel = await pixelService.updatePixel(req.params.id, req.body);

		res.send(updatedPixel);
	});

module.exports = router;
