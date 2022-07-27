const quoteService = require('../services/quotes')



/**
 * make payload for the request body
 * request the service to add a new quote
 * update the response if the service gives an error
 * update the response if service updates the database
 */
exports.newQuote = async(req, res) =>
{

 	let payload = {
 		quote: req.body.quote ? req.body.quote : "",
 		description: req.body.description ? req.body.description : "",
 		author: req.body.author ? req.body.author : "",
 		comments: req.body.comments ? req.body.comments : "",
 		category: req.body.category ? req.body.category : "",
 		tags: req.body.tags ? req.body.tags : ""
 	}
 	try
 	{
		let service_response
		if(Object.keys(req.query).length > 0 && req.query.hasOwnProperty('requestfrom'))
		{
			if(req.query.requestfrom == 'guest')
			{
				// will send the mail to admin with the request data
				service_response = await quoteService.newQuoteRequest(payload)
			}
			if(req.query.requestfrom == 'admin')
			{
				// will add the new quote in database
				service_response = await quoteService.newQuote(payload)
			}
		}
 		console.log("\n>>>Service Response: ", service_response)

 		if(service_response.error === 1)
 		{
			// successfull processing but error
			res.status(200).send({
				error: 1,
				message: service_response.message,
				data: service_response.data
			})
		}else if(service_response.error === 2)
		{
			// if any server error is encountered 
			res.status(500).send({
				error: 1,
				message: service_response.message,
				data: service_response.data
			})
		}else
		{
			// successfull response
			res.status(200).send({
				error: 0,
				message: service_response.message,
				data: service_response.data,
			})
		}
	}catch(err)
	{
		console.log("", err)
		res.status(400).send({
			error: 1,
			message: err,
			data: {}
		})
	}
}



/**
 * Request to fetch all quotes or according to specified filters
 * ************** Steps ************************
 * make queries payload for the requested queries
 * request the service for data 
 * update the response according to service response
 * send a 500 server response if any error persists
 */
exports.allQuotes = async (req, res) =>
{
	try
	{
		let queries = {
			sortBy: req.query.sortBy ? req.query.sortBy : "",
			asc: req.query.asc ? req.query.asc : "",
			value: req.query.value ? req.query.value : "",
			author: req.query.author ? req.query.author : "",
			category: req.query.category ? req.query.category : ""
		}
		let service_response = await quoteService.getAllQuotes(queries)
		console.log('\n>>> Service Response ', service_response)

		if(service_response.error === 0)
		{
			res.status(200).send({
				error: 0,
				message: service_response.message,
				data: service_response.data
			})
		}else
		{
			res.status(500).send({
				error: 1,
				message: service_response.message,
				data: service_response.data,
			})
		}
	}catch(err)
	{
		console.error("\nExperiencing error in controller [controller/quotes/allQuotes()] : ", err)
		res.status(500).send({
			error: 1,
			message: err,
			data: {}
		})
	}
}




/**
 * Fetch a specific quote via quote id
 */
exports.getQuote = async (req, res) =>
{
	try
	{
		let service_response = await quoteService.getQuote(req.params.quoteId.split('&'))
		if(!service_response.error)
		{
			// successfull response
			res.status(400).send({
				error: true,
				message: service_response.message,
				data: {}
			})
		}
		else
		{
			res.status(200).send({
				error: false,
				message: service_response.message,
				data: service_response.data
			})
		}
	}catch(err)
	{
		console.error('\nError while fetching records from database: ', err)
		res.status(200).send({
			error: true,
			message: err,
			data: {}
		})
	}
}



exports.fetchRandomQuote = async (req, res) =>
{
	try
	{
		service_response = await quoteService.fetchRandom()

		if(!service_response.error)
		{
			// successfull response
			res.status(200).send({
				error: 0,
				message: 'Successfuly retrieved data',
				data: service_response.data
			})
		}
		if(service_response.error)
		{
			res.send({
				error: 1,
				message: service_response.message,
				data: {}
			})
		}
	}
	catch(err)
	{
		res.status(500).send({
			error: 1,
			message: err,
			data: {}
		})
	}
}



/**
 * update quote of specified quote id
 * 
 * 
 */
exports.updateQuote = async (req, res) =>
{
	let payload = {}
	if(req.body.quote && req.body.quote != ""){ payload['quote'] = req.body.quote }
	if(req.body.description && req.body.description != ""){ payload['description'] = req.body.description }
	if(req.body.author && req.body.author != ""){ payload['author'] = req.body.author }
	if(req.body.tags && req.body.tags.length == 0){ payload['tags'] = req.body.tags }
	if(req.body.category && req.body.category != ""){ payload['category'] = req.body.category }
	if(req.body.comments && req.body.comments != ""){ payload['comments'] = req.body.comments }
 	try
 	{
 		let service_response = await quoteService.updateQuote(req.params.quoteId, payload)
 		console.log('>>> ', service_response)
 	}catch(err)
 	{
 		// console.log('Experiencing error in controller [controller/]', err)
 		res.status(500).send({
 			error: 1,
 			message: err,
 			data: {}
 		})
 	}
}