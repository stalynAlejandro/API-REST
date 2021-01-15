var express = require('express');
var router = express.Router();
var ParseServer = require('parse-server').ParseServer;

var app = express();
var api = new ParseServer({
    "appId": "iNKOx4ntR0M47a9TaDUKvMRhtZlMoOQAfOWJjkZq",
    "masterKey": "myKey",
    "appName": "listaCompra",
    "cloud": "./cloud/main",
    "databaseURI": "mongodb://127.0.0.1:27017/parse_db"
});

process.env.environment = 'development'

const PORT = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


app.listen(PORT, function() {
  console.log('Lista de la Compra running on port ' + PORT + '.');
});