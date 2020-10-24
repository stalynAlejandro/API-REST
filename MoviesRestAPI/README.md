An API is always needed to create mobile aplications, single page applications, use AJAX calls and provide data to clients. 
An popular architectural style of how to structure and name these APIs and the endpoints is called *REST (Representational Transfer State) HTTP 1.1* was designed keeping REST principles in mind. REST was introduced by Roy Fielding in 2000. 

RestFul URIS and methods provide us with almost all information we need to proces a resquest. The table given below summarizes how the various verbs be used and how URIs should be named. We will be creating a movies API towards the end. Let us how discuss how it will be structured.

- GET   `/movies`  > Get the list of all movies and their details.
- GET   `/movies/123` >  Get the details of Movie id 123.
- POST `/movies` > Creates a new movie with the details provided.
- PUT `/movies/123` > Modifies movie id 123 (create one if it doesn't already exists). Response contains the URI for this newly created resource. 
- DELETE `/movies/123` > Movie id 123 should be deleted, if it exists. Response should contain the status of the requests. 

Let us now create this API in Express. We will be using JSON as our transport data format as it is easy to work with JS. 