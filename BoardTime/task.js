var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Task = mongoose.model("Task");
var User = mongoose.model("User");

//Routes
router.get('/:user/tasks', (req, res) => {
    User.findOne({ 'name': req.params.user }, (err, user) => {
        res.status(200).render('task', { username: req.params.user, tasks: user.tasks })
    })
});

router.post('/:user/tasks', (req, res) => {

    User.findOne({ 'name': req.params.user }, (err, user) => {

        user.tasks.push(new Task({ 'name': req.body.name, 'desc': req.body.desc }))

        User.findByIdAndUpdate(user._id, { 'tasks': user.tasks }, function (err, response) {
            if (err) res.status(400).json({ message: "Error in updating person with id " + user._id });
            res.status(200).redirect('/' + req.params.user + '/tasks')
        });
    })
});

module.exports = router;