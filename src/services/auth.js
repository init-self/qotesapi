// interaction with database

const authModel = require('../models/auth')


// check for existing user else signups
exports.allowAccess = async (data) =>
{
	let docs = await authModel.findOne({email: data.email})
	if(docs && docs.email == data.email)
	{
		return {status: 0, data: 'User already exist. '}
	}else
	{
		// try inserting a new object 
		try
		{
			let auth = new authModel(data)
			let res = await auth.save()
			if(res)
			{
				console.log('\nData inserted successfully. ')
				return {error: 0, data: res, message: 'Success'}
			}
		}catch(err)
		{
			console.error('\nError while adding documents in database. ', err)
			return {error: 1, message: err, data: []}
		}
	}
}

// match credentials
exports.authCheck = async(data) =>
{
	let docs = await authModel.findOne({email: data.email})
	if(docs)
	{
		if(docs.email == data.email && docs.password == data.password)
		{
			console.log('\n Auth Check [authService/authCheck()]: Passed')
			return {error: 0, authenticate: true, message: 'Access Granted '}
		}else
		{
			console.log('\n Auth Check [authService/authCheck()]: Failed')
			return {error: 1, authenticate: false, message: 'Access Denied '}
		}
	}else
	{
		console.log('\n No user found with this email id')
		return {error: 1, message: 'No User Found. ', authenticate: false}
	}
}

exports.forgotPassword = (email) =>
{
	console.log(email)	
}

