const express = require('express')
const connection = require('./connection/connection')
const routes = require('./src/routes')
const cors = require('cors')

require('dotenv').config({debug: true})
require('./src/controllers/auth')



const app = express()

app.use(cors({
	origin: 'http://localhost:5500/'
}))





let host, port
/**
 * give priority to config values if provided from command line
 */
/*if(process.argv.length > 2)
{
	if(process.argv[2] === '--host' || process.argv[2] === '--port')
	{
		// process.argv returns an array with first two values as 
		// the path of node and path of current file respectively.
		// and other indexes depends on the arguments given from command line
		// Eg:-
		// $ node server.js 8800 local 7858
		// will return process.argv - ['file_path_of_node', 'file_path_of_server.js', '8800', 'local', '7858']
		if(process.argv[2] === '--host' && process.argv[4] === '--port')
		{
			host = process.argv[3] || 'localhost'
			port = parseInt(process.argv[5])
		}else
		{
			port = parseInt(process.argv[3])
			host = process.argv[5] || 'localhost'
		}
	}else
	{
		try
		{
			port = parseInt(process.argv[2])
			host = process.argv[3]
		}catch (err)
		{
			host = process.argv[2]
			port = parseInt(process.argv[3])
		}
	}
}else
{
	host = process.env.HOST
	port = process.env.PORT || process.env.PORT2 || process.env.PORT3 || 5500 || 6500 || 6578
}*/


host = process.env.HOST
port = process.env.PORT






// mongoose connection
connection.connect(process.env.MongoURI)


app.use(express.json()) 	// Body Parser



app.get('/', (req, res) =>
{
	res.status(200).send('\nServer Running ...')
})

app.use('/api', routes)	// to access api routes


app.listen(port, () =>
{
	console.log(`\n\n\n-- x --  Server up and running on http://${host}:${port}/  -- x --`)
	console.log('\nConnecting to MongoDB instance. Please Wait ...')
})