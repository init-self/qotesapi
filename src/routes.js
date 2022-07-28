const express = require('express')
const authController = require('./controllers/auth')
const quoteController = require('./controllers/quotes')
const setHeader = require('./middlewares/SetHeaders')


const router = express.Router()


router.use(setHeader())


router.get('/', (req, res) =>
{
	if(Object.keys(req.body).length == 0 && Object.keys(req.params).length == 0 )
	{
		console.log('\nAPI Running ...')
		res.status(200).send('API Running ...')
	}else
	{
		console.log('Bad Request ...')
		res.status(400).send('Bad Request ...')
		res.end()
	}
})

// Routes for Authentication
router.route('/auth/signup')
	.post(authController.newAuth)

router.route('/auth/login')
	.get(authController.authCheck)


// Routes for CRUD operations on Quotes
router.route('/quote/new')
	.post(quoteController.newQuote) // register a new quote

router.route('/quote/all')
	.get(quoteController.allQuotes)	// get all quotes or with filters

router.route('/quote/random')
	.get(quoteController.fetchRandomQuote)

router.route('/quote/specific/:quoteId')
	.get(quoteController.getQuote) // get specific quote with specific id
	.put(quoteController.updateQuote) // update quote



module.exports = router
