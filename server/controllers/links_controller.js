var express = require('express');// We need this because we already created an express app so lets use that but we need
// to route it.

//below is doing a combo of both routing and controlling.
var  LinksController = express.Router();

// Models
var Link = require('../models/link.js');
//API Routes

LinksController.get('/', function(req, res){
  //find all links and then evaluate a callback, which takes the error and links
  Link.find({}, function(err, links){
    //send the links down as json.
    res.json(links);
  });
});

LinksController.delete('/:id', function(req, res){
  var id = req.params.id;
  Link.findByIdAndRemove(id, function(){
    res.json({status: 202, message: 'Success'});
  });
});

LinksController.post('/', function(req, res){
  var link = new Link(req.body);//body parser doing its parsing and putting it into params.
  link.save(function(){
    res.json(link);
  });
});

module.exports = LinksController;
