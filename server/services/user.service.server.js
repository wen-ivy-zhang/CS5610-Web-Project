module.exports = function (app) {
  var userModel = require("../models/user/user.model.server");
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  var bcrypt = require("bcrypt-nodejs");
  var courseModel = require("../models/course/course.model.server");

  app.get('/api/users', findAllUsers);
  app.get('/api/faculty', findAllFaculty);
  app.get('/api/students', findAllStudents);
  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post('/api/register', register);
  app.post('/api/loggedin', loggedin);
  app.get("/api/user/:userId", findUserById);

  app.get("/api/user/:userId/course", findCoursesByUser);
  app.put("/api/student/:userId/course/:courseId", addCourseForStudent);
  app.delete("/api/student/:userId/course/:courseId", deleteCourseForStudent);

  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.get('/facebook/login', passport.authenticate('facebook', {scope: 'email'}));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/student',
    failureRedirect: '/login'
  }));


  // config passport
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function (user) {
          done(null, user);
        },
        function (err) {
          done(err, null);
        }
      );
  }

  // config local strategy
  passport.use(new LocalStrategy(localStrategy));

  function localStrategy(username, password, done) {
    userModel
      .findUserByUsername(username)
      .then(
        function (user) {
          if (user && bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function (err) {
          if (err) {
            return done(err);
          }
        }
      );
  }

  // config facebook strategy
  var facebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID ? process.env.FACEBOOK_CLIENT_ID : '123',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET ? process.env.FACEBOOK_CLIENT_SECRET : '123',
    callbackURL: process.env.FACEBOOK_CALLBACK_URL ?
      process.env.FACEBOOK_CALLBACK_URL : 'http://localhost:4200/auth/facebook/callback'
  };

  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

  function facebookStrategy(token, refreshToken, profile, done) {
    userModel.findUserByFacebookId(profile.id).then(function (user) {
      if (user) {
        return done(null, user);
      } else {
        var names = profile.displayName.split(" ");
        var newFacebookUser = {
          username: names[0],
          password: 'facebook',
          lastName: names[1],
          firstName: names[0],
          email: profile.emails ? profile.emails[0].value : "",
          type: 'STUDENT',
          facebook: {id: profile.id, token: token}
        };
        return userModel.createUser(newFacebookUser);
      }
    }, function (err) {
      if (err) {
        return done(err);
      }
    }).then(function (user) {
      return done(null, user);
    }, function (err) {
      if (err) {
        return done(err);
      }
    });
  }


  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel.createUser(user)
      .then(function (user) {
          if (user) {
            req.login(user, function (err) {
              if (err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        }
      );
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
  }

  function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function findUserById(req, res) {
    var userId = req.params["userId"];
    userModel.findUserById(userId)
      .then(function (user) {
        res.json(user);
      })
  }

  function findCoursesByUser(req, res) {
    var userId = req.params["userId"];
    userModel.findUserById(userId).then(
      function (user) {
        courseModel.findCoursesByIds(user.courses).then(
          function (courses) {
            res.json(courses);
          }
        );
      }
    );
  }

  function addCourseForStudent(req, res) {
    var userId = req.params["userId"];
    var courseId = req.params["courseId"];
    userModel.findUserById(userId).then(
      function (user) {
        user.courses.push(courseId);
        userModel.updateUser(userId, user).then();
        res.json(user);
      }
    );
  }

  function deleteCourseForStudent(req, res) {
    var userId = req.params["userId"];
    var courseId = req.params["courseId"];
    userModel.findUserById(userId).then(
      function (user) {
        var i;
        for (i = 0; i < user.courses.length; i++) {
          // HAVE TO USE "==", NOT "==="
          if (user.courses[i] == courseId) {
            break;
          }
        }
        user.courses.splice(i, 1);
        userModel.updateUser(userId, user).then();
        res.json(user);
      }
    );
  }

  function updateUser(req, res) {
    var userId = req.params["userId"];
    var user = req.body;
    userModel.updateUser(userId, user).exec();
    userModel.findUserById(userId)
      .then(function (user) {
        res.json(user);
      });
  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    courseModel.deleteCoursesByProf(userId).then();
    userModel.deleteUser(userId)
      .then(function (status) {
        res.send(status);
      });
  }

  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (users) {
        res.send(users);
      })
  }

  function findAllFaculty(req, res) {
    userModel.findAllFaculty()
      .then(function (faculty) {
        res.send(faculty);
      });
  }

  function findAllStudents(req, res) {
    userModel.findAllStudents()
      .then(function (students) {
        res.send(students);
      });
  }

};
