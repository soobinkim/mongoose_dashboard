var mongoose = require('mongoose')
var Animal = mongoose.model('Animal')


var mongoose = require('../controllers/mongoose.js');
module.exports = function(app){

	app.get('/', function(req, res) {
		mongoose.index(req, res)
	})

	//route for the new page.
	app.get('/lions/new', function(req, res) {
		res.render('new')
	})

	// show
	app.get('/lions/:id', function(req, res) { // have to pass in animals below.
		mongoose.show(req, res)
	})

	//take you the edit page
	app.get('/lions/edit/:id', function(req, res) {
		mongoose.edit(req, res)
	})


	app.post('/lions/:id', function(req, res){
		mongoose.update(req, res)
	})


	//destroy route
	app.post('/lions/destroy/:id', function(req, res){
		mongoose.destroy(req, res)
	})

	app.post('/lions', function(req, res) {
		mongoose.create(req, res)
	})
}
