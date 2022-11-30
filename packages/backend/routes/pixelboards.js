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

router.get('/id=:id',
	async (req, res) => {
		const pixelboard = await pixelboardService.getPixelboard(req.params.id);

		res.send(pixelboard);
	});

router.get('/count',
	async (req, res) => {
		const count = await pixelboardService.getPixelboardsCount();

		res.send({ count });
	});

router.get('/in-progress',
	async (req, res) => {
		const pixelboards = await pixelboardService.getInProgressPixelboards();

		res.send(pixelboards);
	});

router.get('/finished',
	async (req, res) => {
		const pixelboards = await pixelboardService.getFinishedPixelboards();

		res.send(pixelboards);
	});

router.get('/id=:id/remaing-time',
	async (req, res) => {
		const remainingTime = await pixelboardService.getRemainingTime(req.params.id);

		res.send({ remainingTime });
	});

router.get('/my-pixelboards=:author_id',
	async (req, res) => {
		const pixelboards = await pixelboardService.getMyPixelboards(req.params.author_id);

		res.send(pixelboards);
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

router.get('/:id/pixels',
	async (req, res) => {
		console.log(`GET PIXEL LIST FOR PB ID ${req.params.id}`);

		const pixellist = await pixelboardService.getPixelList(req.params.id);

		res.send(pixellist);
	});

module.exports = router;
