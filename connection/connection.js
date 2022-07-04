var mongoose = require('mongoose')

// Mongoose connection
const Connection = 
{
	/**
	 * connect to mongoose database connection
	 * @param connection_string: [defaults to local mongoose connection string]. Connection URL to connect.
	 */
	connect: async (connection_string) =>
	{
		if(connection_string == undefined || connection_string == "")
		{
			// take database name as the 
			let database = __dirname.split('/')
			connection_string = "mongodb://localhost:27017/" + database[database.length - 2]
		}
		try
		{
			await mongoose.connect(connection_string)
			console.log('\nConnection Successful to \'' + connection_string +'\'')
			console.log('\n Listening to routes ...')
		}catch(err)
		{
			console.error('\nMongoose Connection Error: ', err)
		}
	}
}

module.exports = Connection