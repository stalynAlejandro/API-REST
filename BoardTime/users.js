var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jwt-simple')
var router = express.Router();
var secret = 'saav97'

mongoose.connect('mongodb://localhost/my_db', { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.set('useFindAndModify', false);

var taskSchema = mongoose.Schema({
    name: String,
    desc: String,
});

var userSchema = mongoose.Schema({
    name: String,
    password: String,
    tasks: [taskSchema]
});

var Task = mongoose.model("Task", taskSchema);
var User = mongoose.model("User", userSchema);


var Users = []

User.find({}, (err, users) => {
    users.forEach((u) => Users.push(u))
});

//Routes
//Go to singup 
router.get('/', (req, res) => {
    User.find({}, (err, users) => {users.forEach((u) => Users.push(u))});
    res.status(200).render('signup');
});

//Get All Users.
router.get('/users', (req, res) => User.find((err, response) => res.status(200).json(response)));

//Get One User by id
router.get('/user/:id', function (req, res) {
    User.findById(req.params.id, (err, response) => {
        res.status(200).json({ mensaje: response })
    })
});

//Create New User
router.post('/users/signin', (req, res) => {

    if (!req.body.name || !req.body.password) {
        res.status(200).send('Bad Request Error.')
    } else {
        if (Users.find((user) => user.name === req.body.name)) {
            res.status(400).render('signup', { messageSignin: 'User Already Exists!' })
        } else {

            var newUser = new User({
                name: req.body.name,
                password: jwt.encode(req.body.password, secret),
                task: [],
            })

            newUser.save((err, User) => {
                if (err) {
                    res.status(400).render('show_message', { messageSignin: "Database error" });
                } else {
                    res.status(200).redirect('/' + newUser.name + '/tasks');
                }
            })
        }
    }
});

//Login a user
router.post('/users/login', (req, res) => {

    if (!req.body.name || !req.body.password) {
        res.status(400).send('Bad Request Error! - Fill all Inputs.')
    } else {
        User.findOne({ name: req.body.name }, ((err, user) => {
            if (err) {
                res.status(400).render('signup', { messageLogin: "Database Error!" })
            } else {
                if (user !== null && req.body.password === jwt.decode(user.password, secret)) {
                    res.status(200).redirect('/' + user.name + '/tasks');
                } else {
                    res.status(400).render('signup', { messageLogin: "Name and Password don't match!" })
                }
            }
        }))
    }
})

//Edit a User
router.put('/user/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, response) {
        if (err) res.status(400).json({ message: "Error in updating person with id " + req.params.id });
        res.status(200).json(response);
    });
});

//Delete User by it's id
router.delete('/user/:id', function (req, res) {
    User.findOneAndDelete(req.params.id, (err, response) => {
        if (err) res.status(400).json({ message: 'Error deleting : ' + req.params.id })
        else res.status(200).json({ message: 'User with id : ' + req.params.id + ' removed.' })
    })
})

//Delete User by it's name
router.delete('/user/:name', function (req, res) {
    User.findOneAndDelete(req.params.name, (err, response) => {
        if (err) res.status(400).json({ message: 'Error deleting : ' + req.params.name })
        else res.status(200).json({ message: 'User with id : ' + req.params.name + ' removed.' })
    })
})

module.exports = router;