var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Task = mongoose.model("Task");
var User = mongoose.model("User");

//Routes
//Get task of a user
router.get('/:user/tasks', (req, res) => {
    User.findOne({ 'name': req.params.user }, (err, user) => {
        res.status(200).render('task', { username: req.params.user, tasks: user.tasks })
    })
});

//Post a new Task of a User
router.post('/:user/tasks', (req, res) => {
    User.findOne({ 'name': req.params.user }, (err, user) => {
        if (user != null) {
            user.tasks.push(new Task({ 'name': req.body.name, 'desc': req.body.desc }))
            User.findByIdAndUpdate(user._id, { 'tasks': user.tasks }, function (err, response) {
                if (err) res.status(400).json({ message: "Error in updating person with id " + user._id });
                res.status(200).redirect('/' + req.params.user + '/tasks')
            });
        }
    })
});

//Detele a Task. 
router.delete('/:users/tasks/:id', (req, res) => {
    User.findOne({ 'name': req.params.users }, (err, user) => {
        if (user != null) {
            var taskss = user.tasks.filter((t) => t._id != req.params.id)
            User.findByIdAndUpdate(user._id, { 'tasks': taskss }, function (err, response) {
                if (err) res.status(400).json({ message: "Error in updating person with id " + user._id });
                res.status(200).redirect('/' + req.params.users + '/tasks')
            });
        }
    })
})



module.exports = router;