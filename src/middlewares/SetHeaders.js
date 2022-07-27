const express = require('express')



const set = {
	set: (req, res, next) =>
	{
		let allowed_origins = ['http://localhost:5500','https://qotesapi.herokuapp.com']
		const origin = req.headers.origin
		if(allowed_origins.includes(origin))
		{
			res.set('Access-Control-Allow-Origin', origin)
		}
		return next()
	}
}



module.exports = set