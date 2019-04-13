var mongoose = require('mongoose');
var WidgetSchema = require("../widget/widget.schema.server");

var CourseSchema = mongoose.Schema({
  _faculty: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
  number: String,
  description: String,
  name: String,
  rating: Number,
  sumRating: Number,
  numRating: Number,
  widgets: [WidgetSchema],
  dateCreated: {
    type: Date,
    default: Date.now
  }
}, {collection: 'course'});

module.exports = CourseSchema;
