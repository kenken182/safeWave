var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var admin = require('firebase-admin')
var firebase = require("firebase");
var firebaseConfig = require('./firebaseconfig.js')
var cors = require('cors')
const serviceAccount = require('./googlecred.json');
var bodyParser = require('body-parser');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

firebase.initializeApp(firebaseConfig)
const db = admin.firestore();

var meetingsRouter = require('./routes/meetings');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(cookieParser());

// Endpoints
app.use('/meetings', meetingsRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
