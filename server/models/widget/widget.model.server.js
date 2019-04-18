var mongoose = require("mongoose");

var WidgetSchema = require("./widget.schema.server");
var CourseModel = require("../course/course.model.server");
var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForCourse = findAllWidgetsForCourse;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
// WidgetModel.reorderWidget = reorderWidget;

module.exports = WidgetModel;

function createWidget(courseId, widget) {
  return WidgetModel.create(widget)
    .then(
      function(responseWidget) {
        CourseModel.findCourseById(courseId)
          .then(
            function (course) {
              //widget.position = course.widgets.length;
              course.widgets.push(responseWidget);
              //widget.save();
              //return course.save();
              return CourseModel.updateCourse(courseId, course);
            });
        return responseWidget;
      });
}

function findAllWidgetsForCourse(courseId) {
  return WidgetModel.find({courseId: courseId});
}

function findWidgetById(widgetId) {
  return WidgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget){
  var options = { new: true };

  if (widget.widgetType === 'IMAGE' && widget.url === 'url') { //don't update image if it has invalid url
    return WidgetModel.findById(widgetId);
  }
  else {
    return WidgetModel.findByIdAndUpdate(widgetId, widget, options);
  }

}

function deleteWidget(widgetId) {
  return WidgetModel.findByIdAndRemove(widgetId)
    .then(
      function (widget) {
        CourseModel.findCourseById(widget.courseId)
          .then(
            function (course) {
              for (var x = 0; x < course.widgets.length; x++) {
                if (course.widgets[x] == widgetId) {
                  //remove the widget reference from the course widgets array as well
                  course.widgets.splice(x, 1);
                  return CourseModel.updateCourse(course._id, course);
                }
              }
            }
          );
        return widget;
      }
    );
}


// function array_swap(arr, old_index, new_index) {
//   console.log("temp array size: " + arr.length);
//   while (old_index < 0) {
//     old_index += arr.length;
//   }
//   while (new_index < 0) {
//     new_index += arr.length;
//   }
//
//   if (new_index >= arr.length) {
//     var k = new_index - arr.length + 1;
//     while (k--) {
//       arr.push(undefined);
//     }
//   }
//   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
// };

// function reorderWidget(courseId, startIndex, endIndex) {
//   // return courseModel.findCourseById(courseId).then(
//   //   function(course) {
//   //     course.widgets.splice(end, 0, course.widgets.splice(start, 1)[0]);
//   //     return course.save();
//   //   }
//   // )
//
//   return WidgetModel.find({courseId: courseId})
//     .then(
//       function (resultSet) { //store the widgets that needs to be reordered that belongs to this course into resultSet
//         console.log("shuffle");
//
//         // remove the widgets of this course from the widgets database, reordered set will be added back later
//         return WidgetModel.remove({courseId: courseId})
//           .then(
//             function () {
//               array_swap(resultSet, startIndex, endIndex); //reorder the widget set that belongs to current course
//
//               //add the reordered set back into widgets database
//               return WidgetModel.insertMany(resultSet)
//                 .then(
//                   function() {
//                     console.log("exiting 1");
//                     return resultSet;
//                   }
//                 );
//             }
//           );
//
//         console.log("exiting 2");
//         //return resultSet;
//       }
//     );
// }

