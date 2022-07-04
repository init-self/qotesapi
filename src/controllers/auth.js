const authService = require('../services/auth')
const authModel = require('../models/auth')


// request for a new user signup
exports.newAuth = async (req, res) =>
{
	console.log('\n\n New Auth ...')
	console.log('Body: ', req.body)
	console.log('Params: ', req.params)
	console.log('Query: ', req.query)

	try
	{
		let saveData = {
			email: req.body.email,
			password: req.body.password,
			role: req.body.role ? req.body.role : 'NA'
		}
		// wait for the data to be inserted into database
		let service_response = await authService.allowAccess(saveData)
		console.log(">>> Service Response: ", service_response)


		// check if the data is successfully inserted ?
		if(service_response.error == 1)
		{
			// if any error ?
			res.status(200).send({
				error: true,
				data: service_response.data,
				message: service_response.message
			})
		}else
		{
			// on successful updation ...
			res.status(200).send({
				message: service_response.message,
				data: service_response.data,
				error: false
			})
		}
	}catch(err)
	{
		console.log('\nError while Auth Checking from [src/controllers/auth]: ', err)
		res.status(400).send({
			error: true,
			message: err,
			data: []
		})
	}
}



// request for existing authentication 
exports.authCheck = async (req, res) =>
{
	console.log('\n\n Auth Check ...')
	console.log('Body: ', req.body)
	console.log('Params: ', req.params)
	console.log('Query: ', req.query)


	// reframe the payload
	let check_data = {
		email: req.body.email,
		password: req.body.password
	}

	let service_response = await authService.authCheck(check_data)
	console.log('\n>>> Service Response', service_response)


	if(service_response.error == 1)
	{
		// if any error ?
		res.status(200).send({
			error: true,
			authenticate: service_response.authenticate,
			message: service_response.message // 'Access Granted' / 'Access Denied'	
		})
	}else
	{
		console.log('\n Successfully authenticated ...')
		res.status(200).send({
			error: false,
			authentication: service_response.authenticate,
			message: service_response.message
		})
	}
}



// incompleted function
exports.forgotPassword = async (req, res) =>
{
	console.log('\n\nForgot Password ...')
	console.log('Body: ', req.body)
	console.log('Params: ', req.params)
	console.log('Query: ', req.query)
	
	try
	{
		await authService.forgotPassword(req.body)
	}catch(err)
	{
		console.log('\nError while sending code for forgot password from [src/controllers/auth]: ', err)
	}
}



