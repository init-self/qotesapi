const express = require('express')
const authController = require('./controllers/auth')
const quoteController = require('./controllers/quotes')
// const Validation = require('../middlewares/validation')


const router = express.Router()

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

router.route('/quote/specific/:quoteId')
	.get(quoteController.getQuote) // get specific quote with specific id
	.put(quoteController.updateQuote) // update quote


// router.route('/quotes')
// 	.get(routeController.getAllQuotes)

// router.route('/quotes/:quoteid')
	// .get(routeController.getSpecificQuote)
	// .put(routeController.updateSpecificQuote)
	// .delete(routeController.deleteQuote)



module.exports = router