var mongoose = require('mongoose');
//var WidgetSchema = require("../widget/widget.schema.server");

var CourseSchema = mongoose.Schema({
  name: String,
  faculty: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
  number: String,
  description: String,
  rating: Number,
  sumRating: Number,
  numRating: Number,
  widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
  //widgets: [WidgetSchema],
  // classTimes: [{
  //   day: String,
  //   startTime: String,
  //   endTime: String}],
  classTimes: {day: String, startTime: String, endTime: String},
  startDate: Date,
  endDate: Date,
  term: String,
  location: String,
  registeredStudents: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
  comments: [String],
  dateCreated: {
    type: Date,
    default: Date.now
  }
}, {collection: 'course'});

module.exports = CourseSchema;
