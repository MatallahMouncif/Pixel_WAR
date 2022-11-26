const Pixelboard = require('../models/pixelboard');

const getPixelboards = () => new Promise((resolve, reject) => {
	try {
		const pixelboards = Pixelboard.find();

		console.log(pixelboards);

		resolve(pixelboards);
	} catch (error) {
		reject(error);
	}
});

const getPixelboard = (_id) => new Promise((resolve, reject) => {
	try {
		const pixelboard = Pixelboard.findOne({ _id });

		resolve(pixelboard);
	} catch (error) {
		reject(error);
	}
});

module.exports.getPixelboards = getPixelboards;
module.exports.getPixelboard = getPixelboard;
