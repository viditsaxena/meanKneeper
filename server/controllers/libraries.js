var express = require('express');// We need this because we already created an express app so lets use that but we need
// to route it.

//below is doing a combo of both routing and controlling.
var  librariesController = express.Router();

// Models - We need this to use the schema in the user model.
var User =   require('../models/user');

//API Routes

// librariesController.get('/', function(req, res){
//   //find all links and then evaluate a callback, which takes the error and links
//   Library.find({}, function(err, libraries){
//     //send the links down as json.
//     res.json(libraries);
//   });
// });

// librariesController.delete('/:id', function(req, res){
//   var id = req.params.id;
//   User.findByIdAndRemove(id, function(){
//     res.json({status: 202, message: 'Success'});
//   });
// });

librariesController.post('/', function(req, res){
  User.findOne({token: req.headers.token}, function(err, user){
  user.libraries.push(req.body);
  user.save(function(){
    res.json(user);
  });
 });
});


module.exports = librariesController;
