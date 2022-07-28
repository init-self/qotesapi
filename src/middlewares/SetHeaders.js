const express = require('express')



module.exports = function setHeader (req, res, next)
{
	let allowed_origins = ['http://localhost:5500','https://qotesapi.herokuapp.com']
	console.log(req.headers)
	const origin = req.headers.origin
	console.log(origin)
	if(allowed_origins.includes(origin))
	{
		res.set('Access-Control-Allow-Origin', origin)
	}else
	{
		res.status(403).send({
			error: 1,
			message: 'Unauthorized Request',
			data: {}
		})
	}
	next()
}