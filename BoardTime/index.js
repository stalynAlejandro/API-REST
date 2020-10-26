var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var users = require('./users')
var tasks = require('./task')
var app = express()

process.env.environment = 'development'

const PORT = process.env.PORT || 3000;

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

app.listen(PORT)
console.log('Litening in port ' + PORT)