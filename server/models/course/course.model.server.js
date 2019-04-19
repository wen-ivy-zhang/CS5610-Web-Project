var mongoose = require('mongoose');
var CourseSchema = require('./course.schema.server');
var CourseModel = mongoose.model('CourseModel', CourseSchema);
var UserModel = require("../user/user.model.server");

CourseModel.createCourseForProf = createCourseForProf;
CourseModel.findCourseById = findCourseById;
CourseModel.findCourseByNumber = findCourseByNumber;
CourseModel.updateCourse = updateCourse;
CourseModel.deleteCourse = deleteCourse;
CourseModel.signatureCourses = signatureCourses;
CourseModel.deleteCoursesByProf = deleteCoursesByProf;
CourseModel.findCoursesByIds = findCoursesByIds;

module.exports = CourseModel;

function createCourseForProf(userId, course) {
  course.faculty = userId;
  return CourseModel.create(course)
    .then(function (responseCourse) {
      UserModel.findUserById(userId)
        .then(function (user) {
          user.courses.push(responseCourse._id);
          return user.save();
        });
      return responseCourse;
    });
}

function findCourseById(courseId) {
  return CourseModel.findById(courseId);
}

function findCourseByNumber(courseNumber) {
  return CourseModel.findOne({number: courseNumber});
}

function updateCourse(courseId, course) {
  return CourseModel.findByIdAndUpdate(courseId, course);
}

function deleteCourse(courseId) {
  return CourseModel.findByIdAndRemove(courseId);
}

function signatureCourses() {
  return CourseModel.find({}).sort({rating: -1}).exec();
}

function deleteCoursesByProf(userId) {
  return CourseModel.remove({faculty: userId});
}

function findCoursesByIds(courseIds) {
  return CourseModel.find({
    '_id': {$in: courseIds}
  }, function (err, docs) {
  });
}
