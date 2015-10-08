// Load Application Tools
var express     =  require('express'),
    mongoose    =  require('mongoose'),
    bodyParser  =  require('body-parser'),
    morgan      =    require('morgan');

    // Create our Server application
    var app = express();

    // Database connection and giving database the name
    mongoose.connect('mongodb://localhost/knowledge-keeper');

    // *** Server Logging ***
    app.use(morgan('dev'));

    // *** Setting Public Folder ***
    app.use(express.static(__dirname + '/client'));


    // *** Config Body Parsing ***
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));


    // Include Routes
    app.get('/', function(req, res){
      res.sendFile(__dirname + '/client/index.html');
    });

    // //Controller routing
    // var LinksController = require('./server/controllers/links_controller');
    // //Hey App, when there is a request to /api/links, use LinksController.
    // app.use('/api/links', LinksController);

    // *** Routing/Controllers ***
    var UsersController = require('./server/controllers/users');
    app.use('/api/users', UsersController);
    var LibrariesController = require('./server/controllers/libraries');
    app.use('/api/libraries', LibrariesController);
    var LinksController = require('./server/controllers/links');
    app.use('/api/links', LinksController);

    app.listen('8080', function(){
      console.log('...listening on port 8080');
    });
