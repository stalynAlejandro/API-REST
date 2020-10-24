We keep receiving requests, but end up no storing them anywhere. We need a Database to store the data. For this, we will make use of MongoDB.

In order to use Mongo with Express, we need a client API for node. We use Mongoose. Mongoose is used for *document Moodeling* in Node for MongoDB. For document modeling we create a Model (much like a class in document programming), and then we produce documents using this Model(like we create documents of class in OOP). 

All our processing will be done on these "documents" then finally, we will write these documents in our database. 

## Setting up MONGOOSE
`npm i --save mongoose`
`mongo`
`use my_db`

A new database will be created for you. Whenever you open up the monog shell, it will default to "test" db and you will have to change to your database using the same command as above. 
To use Mongoose, we will require in our *index.js* file and then connect to the *mogodb* service runing on *mongodb://localhost*. 

## Retrieving Documents
Moongose provides a lot of functions for retrieving docuemtns, we will focus on 3 of those. 
All these functions also take a callback as the last parameter, and just like the save function, their arguments are error and response. 

```
model.find(conditions, callback)

Person.find({name:'Stalyn', age:20}, function(err, response){
    console.log(response)
})
```

This will fetch all documents where field name is ´Stalyn´ and age is 20.

We can also provide projection we need. The field we need. For example, if we want only the *names* of people whose *nationality* is "Indian" we use

```
Person.find({nationality:'Indian'}, 'name', function(err, response){
    console.log(response)
})

Person.findOne(...) //Always fetches a single, most relevant document. It has the same exact arguments as find()

Person.findById("098985", function(wrr, response){
    console.log(response)
})

```

## Updating Documents

> model.update(condition, updates, callback)

This function takes a conditions and updates an object as input and applies the changes to all documents matching the conditions in the collection. For example, following code will update the nationality 'American' in all Persons documents. 
```
Person.update({age:25}, {nationality:'American'}, function(err, response){
    console.log(response)
})
```

> model.findOneAndUpdate(condition, updates, callback)


It finds one document based on the query and updates that according to the second argument. It also takes a callback as last argument. Let us perform the following example to understand the function.

```
Person.findOneAndUpdate({name:'Stalyn'}, {age:40}, function(err, response){
    console.log(response)
})
```

> model.findByIdAndUpdate(id, updates, callback)

This function updates a single document identified by its id. For example
```
Person.findByIdAndUpdate("507f1f77bcf86cd799439011", {name: "James"}, 
   function(err, response){
      console.log(response);
});
```

## Deleting documents

> model.remove(condition, [callback])

This function takes a condition object as input and removes all documents matching the conditions. 

```
Person.remove({age:20})
```

> model.findOneAndRemove(condition, [callback])
This functions removes a single, most relevant document according to conditions object.

```
Person.findOneAndRemove({name: 'saav'})
```

> model.findByIdAndRemove(id)

```
Person.findByIdAndRemove("12541235")
```