const mongoose = require('mongoose');

const pixelboardSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	creationDate: {
		type: Date,
		default: null,
		required: true,
	},
	endDate: {
		type: Date,
		default: null,
	},
	size: {
		type: Number,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	override_available: {
		type: Boolean,
		default: false,
		required: true,
	},
	userDelay: {
		type: Number,
		default: 10000,
		required: true,
	},
});

module.exports = mongoose.model('Pixelboard', pixelboardSchema);
