const mongoose = require('mongoose');

const pixelboardSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	creation_date: {
		type: Number,
		default: null,
		required: true,
	},
	end_date: {
		type: Number,
		default: null,
	},
	size: {
		type: Number,
		required: true,
	},
	override_available: {
		type: Boolean,
		default: false,
		required: true,
	},
	user_delay: {
		type: Number,
		default: 10000,
		required: true,
	},
	author_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

module.exports = mongoose.model('Pixelboard', pixelboardSchema);
