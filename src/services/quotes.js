const QuoteModel = require('../models/quotes')
const nodemailer = require('nodemailer')
const mail_template = require('../views/mail-template')



/**
* Register a new Quote after avoiding duplicacy of the quote
* ********* Steps *****************
* check if the new quote request is already present in the database
* if yes, send response of error
* else, save the new quote into the database
*/
exports.newQuote = async function (quote_data)
{
 	try
 	{
 		let isexisting = {}
		// check for existing quote on for same author and same category
		let res = await QuoteModel.find({author: quote_data.author, category: quote_data.category})
		
		if(res.length >= 1)
		{
			res.forEach((item) =>
			{
				// requested quote and response quote matches ?
				if(item.quote === quote_data.quote)
				{
					isexisting = {error: 1, data: item}	// update the error
				}else
				{
					isexisting = {error: 0}
				}
			})
		}

		if(isexisting.error == 1)
		{
			return {
				error: 1,
				message: 'Already existing Quote.',
				data: isexisting.data
			}
		}else
		{
			// save the newly requested quote 
			let response = await new QuoteModel(quote_data).save()
			console.log('\n Successfully updated database. ')
			return {
				error: 0,
				message: 'Successfully added new quote. ',
				data: {quote: response.quote}
			}
		}
	}catch(err)
	{
		console.log('Experienced error while adding new quote ', err)
		return {
			error: 2,
			message: err,
			data: {}
		}
	}
}

function sendMail(mail_options)
{
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: 'ishpreet.singh.dev@gmail.com',
			pass: 'ebakhtjlzjwtyxan',
		},
		tls: {
			rejectUnauthorized: true
		}
	})

	let promise = new Promise( (resolve, reject) =>
	{
		transporter.sendMail(mail_options).then( (response, error) =>
		{
			if(error)
			{
				console.log('\n\n')
				console.log(error)
				console.log('\n\n')
				reject(error)
			}
			else
			{
				console.log(`\n\n\n ---------- \r Message Sent: ${response.messageId} \r ---------------`)
				resolve(response.messageId)
			}
		})
	})
	return promise
}

exports.newQuoteRequest = async function(quote_data)
{
	return sendMail({
		from: 'ishpreet.singh.dev@gmail.com', // "QotesAPI"<qotesapi.dev@gmail.com>
		to: 'ishpreet.singh.dev@gmail.com', // ishpreet.singh.dev@gmail.com, tempmail@maildrop.cc
		subject: 'New Quote Request',
		text: 'A new quote request email.',
		html: await mail_template(quote_data)
	}).then( (response) =>
	{
		return {
			error: 0,
			message: 'Successfully requested for a new Quote. ',
			data: {
				messageId: response
			}
		}
	}, (error) =>
	{
		return {
			error: 1,
			message: error,
			data: {}
		}
	})
}



/**
* Retrieve data based on the queries/filters
* ************** Steps **************
* make query according to filter requested
* get the response from the data for that query
* check if the response is filled with data
* else, send empty data response
*/
exports.getAllQuotes = async function (queries)
{
 	try
 	{
 		let res
 		let query = {}

		// make query object acc to received queries
		if(queries.category.length > 1 && queries.author.length == 0)
		{
			query = {category: queries.category}
		}else if(queries.author.length > 1 && queries.category.length == 0)
		{
			query = {author: queries.author}
		}else if(queries.category.length > 1 && queries.author.length > 1)
		{
			query = {category: queries.category, author: queries.author}
		}

		res = await QuoteModel.find(query)
		
		// did not find any quote ?
		if(res && res.length == 0)
		{
			return {
				error: 0,
				message: 'No Quote Found. ',
				data: {}
			}
		}else
		{
			// return the found one
			return {
				error: 0,
				message: 'Successfully retrieved data',
				data: res
			}
		}
	}catch(err)
	{
		console.error('\n Error finding Quotes: ', err)
		return {
			error: 2, 
			message: err, 
			data: {}
		}
	}
}


exports.getQuote = async function (quote_id)
{
	let response = []
	try
	{
		for(let id of quote_id)
		{
			let doc = await QuoteModel.findById(id)
			if(doc != undefined)
			{
				response.push(doc)
			}
		}
		return {
			error: 0,
			message: 'Successfully fetched results',
			data: response
		}
	}catch(err)
	{
		console.log("\n Experiencing error while fetching results. ", err)
		return {
			error: 2,
			message: err,
			data: {}
		}
	}
}



exports.fetchRandom = async function ()
{
	try
	{
		let res = await QuoteModel.aggregate([{
			$sample: { 
				size: 1
			}
		}])

		console.log(res)

		if(res && res.length == 1)
		{
			return {
				error: 0,
				message: 'Successfully retrieved data',
				data: res
			}
		}else 
		{
			return {
				error: 1,
				message: 'No data found.',
				data: {}
			}
		}
	} catch(err)
	{
		return {
			error: 1,
			message: err,
			data: {}
		}
	}
}


// Not working yet
exports.updateQuote = async function(quote_id, quote_new_body)
{
	try
	{
		await QuoteModel.findByIdAndUpdate(quote_id, quote_new_body, (err, doc) =>
		{
			console.log(doc)
		})
	}catch(err)
	{
		console.log('Experiencing error while fetching results. ', err)
		return {
			error: true,
			message: err,
			data: {}
		}
	}
}
