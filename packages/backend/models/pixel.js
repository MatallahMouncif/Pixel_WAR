const mongoose = require('mongoose');

const pixelSchema = new mongoose.Schema({
	last_update: {
		type: Number,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	x: {
		type: Number,
		required: true,
	},
	y: {
		type: Number,
		required: true,
	},
	author_id: {
		type: String,
		required: true,
	},
	pixel_board_id: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Pixel', pixelSchema);
