/* eslint-disable */
const Pixel = require('../models/pixel');
const Pixelboard = require('../models/pixelboard');

const getMyPixels = (authorId) => new Promise((resolve, reject) => {
	try {
		const myPixels = Pixel.find({ author_id: authorId });

		resolve(myPixels);
	} catch (error) {
		reject(error);
	}
});
const checkCooldown = (pid, aid, lastUpdate, cooldown) => new Promise((resolve, reject) => {
	const filter = {
		pixel_board_id: pid,
		author_id: aid,
	};
	Pixel.find(filter).sort({ last_update: -1 }).then((lastPixel) => {
		if (!lastPixel || lastPixel.length == 0 || lastPixel.includes(undefined)) {
			resolve(false)
		}
		else {
			const lastPixelUpdate = lastPixel[0].last_update;
			console.log(lastPixelUpdate, lastUpdate, cooldown);
			console.log(lastUpdate - lastPixelUpdate > cooldown);
			if (lastUpdate - lastPixelUpdate > cooldown) {
				resolve(false);
			}
			else
				resolve(true);
		}

	});
}
);
const createPixel = (pixel) => new Promise((resolve, reject) => {
	try {
		Pixelboard.findOne({ _id: pixel.pixel_board_id }).then((pixelboard) => {
			checkCooldown(pixelboard._id, pixel.author_id, pixel.last_update, pixelboard.user_delay).then((unauthorised) => {
				if (unauthorised) {
					console.log('Cant draw yet');
					resolve(false);
				}
				else {
					console.log('Can draw yet');
					Pixel.findOne(
						{
							x: pixel.x,
							y: pixel.y,
							pixel_board_id: pixel.pixel_board_id,
						},
					).then((foundPixel) => {
						if (foundPixel) {
							Pixelboard.findOne(
								{ _id: pixel.pixel_board_id },
							).then((foundPixelboard) => {
								const pixelboardOverride = foundPixelboard.override_available;
								if (pixelboardOverride === true) {
									const filter = {
										x: pixel.x,
										y: pixel.y,
										pixel_board_id: pixel.pixel_board_id,
									};
									const update = {
										color: pixel.color,
										last_update: pixel.last_update,
									};
									Pixel.findOneAndUpdate(
										filter,
										update,
										{ new: true },
									).then((updatedPixel) => resolve(updatedPixel));
								} else {
									resolve(false);
								}
							});
						} else {
							const newPixel = new Pixel(pixel);
							newPixel.save();
							resolve(newPixel);
						}
					});
				}
			});
		});
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
