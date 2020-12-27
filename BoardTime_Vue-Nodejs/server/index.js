var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var cors = require('cors')
var users = require('./users')
var tasks = require('./task')
var app = express()

process.env.environment = 'development'

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

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