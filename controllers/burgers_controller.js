var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

//get route -> index
router.get('/', function(req,res) {
		res.redirect('/burgers')
});

router.get('/burgers', function(req,res) {
	//express callback response by calling burger.selectAllBurger
	burger.findAll({}).then(function(data) {
        var hbsObject = { burgers: data }
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

//post route -> back to index
router.post('/burgers/insert', function(req, res) {
 burger.create({ burger_name: req.body.burger_name }, { devoured: req.body.devoured }).then(function(data) {
        res.redirect('/burgers')
    })
});

//put route -> back to index
router.put('/burgers/update', function(req,res){
    burger.update({ devoured: req.body.devoured }, {
        fields: ['devoured'],
        where: { id: req.params.id }
    }).then(function(data) {
    	res.redirect('/burgers')
    });
});

module.exports = router;


