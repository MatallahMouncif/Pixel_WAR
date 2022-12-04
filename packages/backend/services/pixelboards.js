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

const countPixelboards = () => new Promise((resolve, reject) => {
	try {
		const count = Pixelboard.countDocuments();

		resolve(count);
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

const getRemainingTime = (id) => new Promise((resolve, reject) => {
	try {
		Pixelboard.findById(id).exec().then((pixelboard) => {
			const endDate = pixelboard.end_date;
			let remainingTime = new Date(endDate) - new Date().getTime();

			if (remainingTime < 0) {
				remainingTime = 0;
			}

			resolve(remainingTime);
		});
	} catch (error) {
		reject(error);
	}
});

const getMyPixelboards = (authorId) => new Promise((resolve, reject) => {
	try {
		const myPixelboards = Pixelboard.find(
			{ author_id: authorId },
		);

		resolve(myPixelboards);
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

const putPixelboard = (id, pixelboard) => new Promise((resolve, reject) => {
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

const patchPixelboard = (id, thumbnail) => new Promise((resolve, reject) => {
	try {
		const patchedPixelboard = Pixelboard.findOneAndUpdate(
			{ _id: id },
			{ $set: thumbnail },
		);

		resolve(patchedPixelboard);
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
module.exports.countPixelboards = countPixelboards;
module.exports.getPixelboard = getPixelboard;
module.exports.getRemainingTime = getRemainingTime;
module.exports.getMyPixelboards = getMyPixelboards;
module.exports.createPixelboard = createPixelboard;
module.exports.putPixelboard = putPixelboard;
module.exports.patchPixelboard = patchPixelboard;
module.exports.deletePixelboard = deletePixelboard;
module.exports.getPixelList = getPixelList;
