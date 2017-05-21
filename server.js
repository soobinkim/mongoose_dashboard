var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose')


// below if we are using boostrap
// app.use(express.static(path.join(__dirname './bower_compenets')))''


app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/m_dashboard');

var AnimalSchema = new mongoose.Schema({ // minlength if you wanted to add it.
	name: {type:String, required:[true, "YOU BETTER CHECK YO SELF BEFORE YOU WRECK YO SELF (Fill Out The Name Foo)"]},
	location: {type:String, required:[true, "YOU BETTER CHECK YO SELF BEFORE YOU WRECK YO SELF (Fill Out The Location Foo)"]}
}) //time stamps:true

// sets our model
mongoose.model('Animal', AnimalSchema);
var Animal = mongoose.model('Animal')

//moved routes to routes.js


var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app);

app.listen(8000, function(){
	console.log("listening on port 8000")
})
