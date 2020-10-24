const { raw } = require('body-parser');
var express = require('express');
var router = express.Router();

var movies = [
    { id: 101, name: 'Fight Club', year: 1999, rating: 8.1 },
    { id: 102, name: 'Inception', year: 2010, rating: 9.7 },
    { id: 103, name: 'The Dark Knight', year: 2008, rating: 7.5 },
    { id: 104, name: 'Angry Men', year: 1957, rating: 9 },
];

//Routes will go here
router.get('/', function (req, res) {
    res.json(movies)
});

//Let us now create a route to get a specific movie by its id.
router.get('/:id([0-9]{3,})', function (req, res) {
    var currMovie = movies.filter(m => m.id == req.params.id);

    if (currMovie.length == 1) res.json(currMovie[0])
    else {
        res.status(401); //Set status to 404 as movie was not found
        res.json({ message: 'Not Found' })
    }
});

//Route to handle POSTed data
router.post('/', function (pet, res) {
    // Check if all field ara provided and are valid
    if (!pet.query.name || !pet.query.year.match(/^[0-9]{4}$/g) || !pet.query.rating.match(/^[0-9]\.[0-9]$/g)) {
        res.status(400)
        res.json({ message: 'Bad Request' })
    } else {
        var newId = movies[movies.length - 1].id + 1;
        movies.push({
            id: newId,
            name: pet.query.name,
            year: pet.query.year,
            rating: pet.query.rating
        });
        res.json({ message: 'New movie created', location: '/movies/' + newId })
    }
    //This will create a new movie and store it in the movies variable.
});

//Almost same as POST route. We will be specifying the id for the object that'll be updated/created.
//Create the route in the following way.
router.put('/:id', function (req, res) {

    console.log(req.params)
    console.log(req.query)

    if (!req.query.name || !req.query.year.match(/^[0-9]{4}$/g) || !req.query.rating.match(/^[0-9]\.[0-9]$/g)) {
        res.status(400)
        res.json({ message: 'Bad Request' })
    } else {
        //Get us the index of movie with given id.
        var updateIndex = movies.map(function (movie) { return movie.id }).indexOf(parseInt(req.params.id));

        if(updateIndex === -1){
            //Movie Not found, create New
            movies.push({
                id: req.params.id,
                name: req.query.name,
                year: req.query.year,
                rating: req.query.rating,
            })
            res.json({message:'New Movie Created', location:'/movies/' + req.params.id})
        }else{
            //Update existing movie
            movies[updateIndex]={
                id: req.params.id,
                name: req.query.name,
                year: req.query.year,
                rating: req.query.rating,
            };
            res.json({message:'Movie id ' + req.params.id + " updated", location:'/movies/' + req.params.id});
        }
    }
});

//DELETE route.
router.delete('/:id', function(req, res){
    //Gets us the index of movie with given id.
    var removeIndex = movies.map(function(movie){return movie.id.toString()}).indexOf(req.params.id.toString())
    if(removeIndex == -1) res.json({message:'Not Found'})
    else{
        movies.splice(removeIndex, 1);
        res.send({message:'Movie id' + req.params.id + ' removed.'})
    }
});

module.exports = router;