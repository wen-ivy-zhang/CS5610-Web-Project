module.exports = function(app) {

  // GET
  app.get("/api/course/:courseId", findCourseById);
  app.get("/api/coursenumber/:courseNumber", findCourseByNumber);
  app.get("/api/signaturecourses", signatureCourses);

  // POST
  app.post("/api/user/:userId/course", createCourse);

  // PUT
  app.put("/api/course/:courseId", updateCourse);
  app.put("/api/course/:courseId/student/:userId", addStudentToCourse);


  // DELETE
  app.delete("/api/course/:courseId", deleteCourse);
  app.delete("/api/course/:courseId/student/:userId/", deleteStudentFromCourse);


  var courseModel = require("../models/course/course.model.server");

  function createCourse(req, res) {
    var userId = req.params.userId;
    var course = req.body;
    courseModel.createCourseForProf(userId, course).then(
      function (course) {
        if (course) {
          res.json(course);
        } else {
          res.sendStatus(400).send("Something went wrong");
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function findCourseById(req, res) {
    var courseId = req.params.courseId;
    courseModel.findCourseById(courseId).then(
      function (course) {
        if (course) {
          res.json(course);
        } else {
          res.sendStatus(400).send("Cannot find course with corresponding Id");
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function findCourseByNumber(req, res) {
    var courseNumber = req.params.courseNumber;
    courseModel.findCourseByNumber(courseNumber).then(
      function (course) {
        res.json(course);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function addStudentToCourse(req, res) {
    var courseId = req.params["courseId"];
    var userId = req.params["userId"];

    courseModel.findCourseById(courseId).then(
      function (course) {
        course.registeredStudents.push(userId);
        courseModel.updateCourse(courseId, course).then();
        res.json(course);
      }
    );
  }

  function deleteStudentFromCourse(req, res) {
    var courseId = req.params["courseId"];
    var userId = req.params["userId"];

    courseModel.findCourseById(courseId).then(
      function (course) {
        var i;
        for (i = 0; i < course.registeredStudents.length; i++) {
          // HAVE TO USE "==", NOT "==="
          if (course.registeredStudents[i] == userId) {
            break;
          }
        }
        course.registeredStudents.splice(i, 1);
        courseModel.updateCourse(courseId, course).then();
        res.json(course);
      }
    );
  }

  function updateCourse(req, res) {
    var courseId = req.params.courseId;
    var updatedCourse = req.body;
    courseModel.updateCourse(courseId, updatedCourse).then(
      function (course) {
        if (course) {
          res.json(course);
        } else {
          res.sendStatus(400).send("Cannot find course with corresponding Id");
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function deleteCourse(req, res) {
    var courseId = req.params.courseId;
    courseModel.deleteCourse(courseId).then(
      function (course) {
        res.json(course);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function signatureCourses(req, res) {
    courseModel.signatureCourses().then(
      function (courses) {
        res.json(courses);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

};
