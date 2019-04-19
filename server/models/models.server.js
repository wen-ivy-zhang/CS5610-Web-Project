var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// var db = mongoose.connect('mongodb://localhost:27017/webdevproject', {useMongoClient: true});
var db = mongoose.connect('mongodb://heroku_lxxxzvsw:ic9k9v3gi1gkngua8id3f905cs@ds113746.mlab.com:13746/heroku_lxxxzvsw',
  {useNewUrlParser: true});

module.exports = db;
