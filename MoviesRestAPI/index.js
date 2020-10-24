var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer();

var app = express();

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.array());

//Require the Router we defined in movies.js
var movies = require('./movies');

//Use the Router on the sub route /movies
app.use('/movies', movies);

app.listen(3000);