
module.exports= function(app, models){

  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname + '/../../dist/my-project/assets/uploads' });
  //var upload = multer({ dest: __dirname + '/../../src/assets/uploads' });


  // POST
  app.post("/api/course/:courseId/widget", createWidget);

  // GET
  app.get("/api/course/:courseId/widget", findAllWidgetsForCourse);
  app.get("/api/widget/:widgetId", findWidgetById);

  // PUT
  app.put("/api/widget/:widgetId", updateWidget);
  // app.put("/api/course/:courseId/widget", reorderWidgets);

  // DELETE
  app.delete("/api/widget/:widgetId", deleteWidget);

  // UPLOAD
  app.post ("/api/upload", upload.single('myFile'), uploadImage);

  var widgetModel = require('../models/widget/widget.model.server');

  function createWidget (req, res) {
    var courseId = req.params.courseId;
    var widget = req.body;
    widget.courseId = courseId;

    widgetModel.createWidget(courseId, widget)
      .then(
        function (widget) {
          res.json(widget);
        },
        function (err) {
          res.sendStatus(400).send(err);
        });
  }

  function findAllWidgetsForCourse (req, res) {
    var courseId = req.params.courseId;

    widgetModel.findAllWidgetsForCourse(courseId)
      .then(function (widgets) {
          res.json(widgets);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }

  function findWidgetById (req, res) {
    var widgetId  = req.params.widgetId;

    widgetModel.findWidgetById(widgetId)
      .then(function (widget) {
          res.json(widget);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }

  function updateWidget (req, res) {
    var widgetId  = req.params.widgetId;
    var widget = req.body;

    widgetModel.updateWidget(widgetId, widget)
      .then(function (widget) {
          console.log(widget);
          res.json(widget);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }

  function deleteWidget (req, res) {
    var widgetId  = req.params.widgetId;

    widgetModel.deleteWidget(widgetId)
      .then(function (widget) {
          res.json(widget);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }


  // function reorderWidgets(req, res) {
  //   console.log("Server entering reorderWidgets");
  //
  //   var startIndex = parseInt(req.query["start"]);
  //   var endIndex = parseInt(req.query["end"]);
  //   var courseId = req.params.courseId;
  //
  //   widgetModel.reorderWidget(courseId, startIndex, endIndex)
  //     .then(
  //       function (resultSet) {
  //         //res.sendStatus(200);
  //         console.log("reorder result: ");
  //         console.log(resultSet);
  //         res.json(resultSet);
  //       },
  //       function (error) {
  //         res.sendStatus(400).send(error);
  //       }
  //     )
  // }

  function uploadImage(req, res) {
    console.log("Entering uploadImage");
    var userId = req.body.userId;
    var courseNumber = req.body.courseNumber;
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    if(myFile == null) {
      //res.redirect("https://yourheroku.herokuapp.com/user/website/"+websiteId+"/course/"+courseId+"/widget/"+widgetId);
      //res.redirect("http://localhost:3200/user/" + userId + "/website/" + websiteId + "/course/" + courseId + "/widget/" + widgetId);
      return;
    }

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;
    var url           = '/assets/uploads/' + filename;

    console.log("widgetId: " + widgetId);
    console.log("url: " + url);
    // for (var i = 0; i < widgets.length; i++) {
    //   if (widgets[i]._id === widgetId) {
    //     widgets[i].url = url;
    //     widgets[i].size = size;
    //     widgets[i].width = width;
    //     //res.json(widgets[i]);
    //     //res.send('File Uploaded Successfully.');
    //     //return;
    //   }
    // }

    widgetModel.findWidgetById(widgetId)
      .then(
        function (widget) {
          widget.url = url;
          widget.size = size;
          widget.width = width;
          widgetModel.updateWidget(widgetId, widget)
            .then(function (widget) {
              console.log(widget);
              console.log("Server exiting uploadImage");
              //res.send(200);
              //res.json(widget);
            });
        },
        function (err) {
          res.sendStatus(404).send(err);
        });

    //console.log("Server exiting uploadImage");
    //res.redirect("https://yourheroku.herokuapp.com/user/website/"+websiteId+"/course/"+courseId+"/widget/"+widgetId);
    //res.redirect("/user/" + userId + "/website/" + websiteId + "/course/" + courseId + "/widget/" + widgetId);
  }

};
