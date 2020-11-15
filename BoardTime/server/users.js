var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jwt-simple')
var router = express.Router();
var secretPassword = 'password'
var secretToken = 'token'

mongoose.connect('mongodb://localhost/my_db', { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.set('useFindAndModify', false);

var taskSchema = mongoose.Schema({
    name: String,
    desc: String,
});

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tasks: [taskSchema]
});

var Task = mongoose.model("Task", taskSchema);
var User = mongoose.model("User", userSchema);

//Routes

//Get All Users.
router.get('/users', (req, res) => User.find((err, response) => res.status(200).json(response)));

//Get One User by id
router.get('/user/:id', function (req, res) {
    User.findById(req.params.id, (err, response) => {
        if (err) res.status(404).json({ message: 'Not Found' })
        else res.status(200).json(response)
    })
});

//Get User by email
router.get('/users/:email', function(req, res){
    User.findOne({'name':req.params.name}, (err, user)=>{
        if(err || user == null) res.status(404).json({message: 'Not Found'})
        else res.status(200).json(user)
    })
})

//Get User by name
router.get('/users/name/:name', function (req, res) {
    User.findOne({ 'name': req.params.name }, (err, user) => {
        if(err || user == null) res.status(404).json({message: 'Not Found'})
        else res.status(200).json(user)
    })
});

//Create New User
router.post('/users/signin', (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send('Bad Request Error')
    } else {
        User.findOne({ email: req.body.email }, ((err, user) => {

            if (user != null) {
                res.status(401).send({message: "Email already exists"})
            } else {

                var newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: jwt.encode(req.body.password, secretPassword),
                    task: [],
                })

                newUser.save((err, User) => {
                    if (err) {
                        res.status(400).send("Can't create user");
                    } else {
                        res.status(201).send("User created");
                    }
                })
            }
        }))
    }
});

//Login a user
router.post('/users/login', (req, res) => {
    console.log(req.body)
    if (!req.body.email || !req.body.password) {
        res.status(400).send('Bad Request Error! - Fill all Inputs.')
    } else {
        User.findOne({ email: req.body.email }, ((err, user) => {

            if(user && user.password === jwt.decode(req.body.password, secretPassword)){
                var accessToken = jwt.encode(user.name, secretToken)
                res.status(200).json({token: accessToken})
            }else{
                res.status(400).send('Username or password incorrect')
            }

        }))
    }
})

//Edit a User by name
router.put('/users/name/:name', function (req, res) {
    User.findOneAndUpdate({ 'name': req.params.name }, req.body, function (err, user) {
        if (user != null) {
            if (err) res.status(400).json({ message: "Error in updating person with id " + req.params.id });
            res.status(200).json({ message: "User with name " + user.name + " changed property name to :" + req.params.name });
        } else {
            res.status(404).json({ message: 'Not Found' })
        }
    });
});

//Delete User by it's name
router.delete('/user/name/:name', function (req, res) {
    User.findOneAndDelete(req.params.name, (err, user) => {
        if (user != null) {
            if (err) res.status(400).json({ message: 'Error deleting : ' + req.params.name })
            else res.status(200).json({ message: 'User with name : ' + req.params.name + ' removed.' })
        } else {
            res.status(404).json({ message: 'Not Found' })
        }
    })
})

//.....................................................................//
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


app.post('/books', authenticateJWT, (req, res) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }


    const book = req.body;
    books.push(book);

    res.send('Book added successfully');
});
//.....................................................................//


module.exports = router;