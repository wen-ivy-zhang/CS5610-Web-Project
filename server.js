// prod mode: change server.js, environment.ts, model.js, widgets.server.service.js
// const baseUrl = 'https://cs5610-project.herokuapp.com/';
const baseUrl = 'http://localhost:4200';
// prod mode: change server.js, environment.ts, model.js, widgets.server.service.js (x2)

// npm install express --save
// npm install path --save
// npm install body-parser --save
// npm install passport --save
// npm install cookie-parser --save
// npm install express-session --save

// npm install mongoose --save
// npm install bcrypt-nodejs --save
// npm install passport-facebook --save
// npm install passport-local --save

// npm install ngx-quill-editor --save
// npm install multer --save


const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

var secret = "random";
if (process.env.SESSION_SECRET) {
  secret = process.env.SESSION_SECRET;
}
app.use(session({
  secret: secret,
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'dist/project')));
app.use('/assets/uploads', express.static(path.join(__dirname, '/src/assets/uploads')));


//CORS
app.use(function(reg, res, next){
  res.header("Access-Control-Allow-Origin", baseUrl);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', "true");
  next();
});

const port = process.env.PORT || '3200';
app.set('port', port);
const server = http.createServer(app);

require("./server/app")(app);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

server.listen( port , function() {
  console.log('Node app is running on port', app.get('port'))});
