var mongoose = require('mongoose')


var AuthSchema = mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 15
	},
	role: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('auth', AuthSchema)
