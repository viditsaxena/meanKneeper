var mongoose    =   require('mongoose');



// Database connection and giving database the name
mongoose.connect('mongodb://localhost/knowledge-keeper');

//What does it mean to be a link
// Schema
var LinkSchema = new mongoose.Schema({
  url: {type: String, require: true},
  comment: {type: String}
});

// Model
var Link = mongoose.model('Link', LinkSchema);



module.exports = Link;
