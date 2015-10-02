// Load Application Tools
var express     =  require('express'),
    mongoose    =  require('mongoose'),
    bodyParser  =  require('body-parser');



    // Create our Server application
    var app = express();

    // Include Middleware
    //where our static files will live
    app.use(express.static(__dirname + "/client"));
    app.use(bodyParser.json());


    // Include Routes
    app.get('/', function(req, res){
      res.sendFile(__dirname + '/client/index.html');
    });

    //Controller routing
    var LinksController = require('./server/controllers/links_controller');
    //Hey App, when there is a request to /api/links, use LinksController.
    app.use('/api/links', LinksController);

    app.listen('8080', function(){
      console.log('...listening on port 8080');
    });
