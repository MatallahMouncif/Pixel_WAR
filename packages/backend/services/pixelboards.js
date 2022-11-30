const Pixelboard = require('../models/pixelboard');
const Pixel = require('../models/pixel');

const getPixelboards = () => new Promise((resolve, reject) => {
	try {
		const pixelboards = Pixelboard.find();

		resolve(pixelboards);
	} catch (error) {
		reject(error);
	}
});

const getPixelboard = (id) => new Promise((resolve, reject) => {
	try {
		const pixelboard = Pixelboard.findById(id);

		resolve(pixelboard);
	} catch (error) {
		reject(error);
	}
});

const getPixelboardsCount = () => new Promise((resolve, reject) => {
	try {
		const count = Pixelboard.countDocuments();

		resolve(count);
	} catch (error) {
		reject(error);
	}
});

const getInProgressPixelboards = () => new Promise((resolve, reject) => {
	try {
		const pixelboards = Pixelboard.find({ status: 'inProgress' });

		resolve(pixelboards);
	} catch (error) {
		reject(error);
	}
});

const getFinishedPixelboards = () => new Promise((resolve, reject) => {
	try {
		const pixelboards = Pixelboard.find({ status: 'finished' });

		resolve(pixelboards);
	} catch (error) {
		reject(error);
	}
});

const createPixelboard = (pixelboard) => new Promise((resolve, reject) => {
	try {
		const newPixelboard = new Pixelboard(pixelboard);

		newPixelboard.save();

		resolve(newPixelboard);
	} catch (error) {
		reject(error);
	}
});

const updatePixelboard = (id, pixelboard) => new Promise((resolve, reject) => {
	try {
		const updatedPixelboard = Pixelboard.findOneAndUpdate(
			{ _id: id },
			{ $set: pixelboard },
			{ new: true },
		);

		resolve(updatedPixelboard);
	} catch (error) {
		reject(error);
	}
});

const deletePixelboard = (id) => new Promise((resolve, reject) => {
	try {
		const removedPixelboard = Pixelboard.findOneAndDelete(
			{ _id: id },
		);

		resolve(removedPixelboard);
	} catch (error) {
		reject(error);
	}
});

const getPixelList = (_id) => new Promise((resolve, reject) => {
	try {
		const pixellist = Pixel.find({ pixel_board_id: _id });
		resolve(pixellist);
	} catch (error) {
		reject(error);
	}
});

module.exports.getPixelboards = getPixelboards;
module.exports.getPixelboard = getPixelboard;
module.exports.getPixelboardsCount = getPixelboardsCount;
module.exports.getInProgressPixelboards = getInProgressPixelboards;
module.exports.getFinishedPixelboards = getFinishedPixelboards;
module.exports.createPixelboard = createPixelboard;
module.exports.updatePixelboard = updatePixelboard;
module.exports.deletePixelboard = deletePixelboard;
module.exports.getPixelList = getPixelList;
