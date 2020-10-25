var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var app = express();

mongoose.connect('mongodb://localhost/my_db', { useUnifiedTopology: true, useNewUrlParser: true })

// app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.array());
app.set('view engine', 'pug')

//Now our app is connected to our db. 
// Let us create a new Model. This model will act as a colletion in our db. 
var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String,
});

var Person = mongoose.model("Person", personSchema);


//Routes
app.get('/', function (req, res) {
    res.render('person')
});

app.get('/person', function (req, res) {
    Person.find(function(err, response){
        res.json(response)
    });
});


//Post route handler at './person' which will handle this request
app.post('/person', function (req, res) {
    var personInfo = req.body; //Get the parsed information
    if (!personInfo.name || !personInfo.age || !personInfo.nationality) {
        res.render('show_message', {
            message: "Sorry, you provided worng info", type: "error"
        });
    } else {
        var newPerson = new Person({
            name: personInfo.name,
            age: personInfo.age,
            nationality: personInfo.nationality
        });

        newPerson.save(function (err, Person) {
            if (err) {
                res.render('show_message', { message: "Database error", type: "error" });
            } else {
                res.render('show_message', {
                    message: "New person added", type: "success", person: personInfo
                });
            }
        });
    }
});

//This will be PUT route with the id as a parameter and details as the payload.
app.put('/person/:id', function(req, res){
    console.log(req.query)
    Person.findByIdAndUpdate(req.params.id, req.query, function(err, response){
       if(err) res.json({message: "Error in updating person with id " + req.params.id});
       res.json(response);
    });
 });

//Route to delete people from our database
app.delete('/person/:id', function(req, res){
    Person.findOneAndDelete(req.params.id, function(err, response){
        if(err) res.json({message:'Error in deleting record id ' + req.params.id})
        else res.json({message:'Person with id ' + req.params.id + ' removed.'})
    })
});

//Route to delete people from our database
app.delete('/person', function(req, res){
    Person.remove({name:'saav'}, function(err, response){
        if(err) res.json({message:'Error in deleting record '})
        else res.json({message:'all saav delete'})
    })
});

app.listen(3000);


console.log('Listening in port 3000')