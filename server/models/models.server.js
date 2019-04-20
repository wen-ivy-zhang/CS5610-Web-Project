var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


//  var connectionString = 'mongodb://127.0.0.1:27017/webdevproject'; //local DB
// // var connectionString = 'mongodb://wenzhang:wenzhang1124@ds117251.mlab.com:17251/heroku_lcx4662p'; //heroku DB
//  var db = mongoose.connect(connectionString, {useNewUrlParser: true});

var db = mongoose.connect('mongodb://heroku_lxxxzvsw:ic9k9v3gi1gkngua8id3f905cs@ds113746.mlab.com:13746/heroku_lxxxzvsw',
  {useMongoClient: true});

// var db = mongoose.connect('mongodb://heroku_lxxxzvsw:ic9k9v3gi1gkngua8id3f905cs@ds113746.mlab.com:13746/heroku_lxxxzvsw',
//   {useNewUrlParser: true});

module.exports = db;
