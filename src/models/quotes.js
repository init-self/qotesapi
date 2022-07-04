const mongoose = require('mongoose')



const quoteSchema = new mongoose.Schema({
	quote: {
		type: String,
		required: true,
		min: 10
	},
	description: String,
	author: {
		type: String,
		required: true
	},
	tags: {
		type: [String],
		default: [],
	},
	comments: String,
	category: {
		type: String,
		required: true
	},
}, { timestamps: true })




module.exports = new mongoose.model('quotes', quoteSchema)