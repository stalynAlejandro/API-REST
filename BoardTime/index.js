var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var users = require('./users')
var tasks = require('./task')
var app = express()

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
    secret: 'cookie_secret',
    name: 'cookie_name',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use('/', users)
app.use('/', tasks)

app.listen(3030)
console.log('Litening in port 3030')