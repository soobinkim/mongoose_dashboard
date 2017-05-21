var mongoose = require('mongoose');
var Animal = mongoose.model('Animal');

module.exports = {
  index: function(req, res){
   newAnimals = []  //was animals before the res
	Animal.find({}, function(err, animals){
		newAnimals = animals;
		res.render('index', {animals: newAnimals})
	})
},

	show: function(req, res){
		var lion = Animal.findOne({_id: req.params.id}, function(err, ani){
			res.render('show', {animals: ani})
		})
	},

	edit: function(req, res){
		Animal.findOne({_id:req.params.id}, function(err, animals){
			res.render('edit', {whatever:animals }) //passed in req.parms.id so we would have access to the id.
		})
	},

	update: function(req, res){
		// another way to pdate . Animal.update({_id: req.params.id}, req.body, {runValidators: true} function(err, animal){
		//
		// })
		Animal.findOne({_id: req.params.id}, function(err, animals){
			if (err){
				res.render('edit', {title: "you have errors!", errors: animals.errors})
			}
			else{
				console.log(animals.name)
			animals.name = req.body.name
			animals.location = req.body.location
			console.log(animals)
			animals.save(function (err){
				if (err){
					console.log("is this the line?")
					console.log(animals) //remember the scoping
					res.render('edit', {title: "you have error!", errors: err.errors, animals:animals})
				}
				else{
					res.redirect('/')
				}
			})
		}
		})
	},

	destroy: function(req, res){
		Animal.remove({_id: req.params.id}, function(err){
			console.log("got an error", err)
			res.redirect('/')
		})
	},

	create: function(req, res){
		console.log("POST DATA", req.body);
		var new_animal = new Animal();
		new_animal.name = req.body.name;
		new_animal.location = req.body.location;
		new_animal.save(function(err){
			if(err){
				// console.log("errors you have errors");
				res.render('new', {title:"you have errors!", errors: new_animal.errors})
			}
			else{
				res.redirect('/')
			}
		})
	}
}
