const Pixel = require('../models/pixel');

const getMyPixels = (authorId) => new Promise((resolve, reject) => {
	try {
		const myPixels = Pixel.find({ author_id: authorId });

		resolve(myPixels);
	} catch (error) {
		reject(error);
	}
});

const createPixel = (pixel) => new Promise((resolve, reject) => {
	try {
		const newPixel = new Pixel(pixel);

		newPixel.save();

		resolve(newPixel);
	} catch (error) {
		reject(error);
	}
});

const updatePixel = (id, pixel) => new Promise((resolve, reject) => {
	try {
		const updatedPixel = Pixel.findOneAndUpdate(
			{ _id: id },
			{ $set: pixel },
			{ new: true },
		);

		resolve(updatedPixel);
	} catch (error) {
		reject(error);
	}
});

module.exports.getMyPixels = getMyPixels;
module.exports.updatePixel = updatePixel;
module.exports.createPixel = createPixel;
