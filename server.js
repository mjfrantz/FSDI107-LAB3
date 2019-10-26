var http = require('http');
var express = require('express');


// Configure
var app = express(); //create an express app

// Enable CORS 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});

//read res body as obj
var bparser = require("body-parser");
app.use(bparser.json());

// To Server PDF, CSS, JS from this server
app.use(express.static(__dirname + "/views"));

//To serve HTML
var ejs = require("ejs");
app.set('views', __dirname + "/views");
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

// Mongo & mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin' 
    );

// Db connection
var db = mongoose.connection;

// DB object constructor
var itemDB;

// Storage Options
var items = [];
var nextId = 0;

// Web Server fucntionality 

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/admin', (req, res) => {
    res.render('admin.html');
});

app.get('/contact', (req, res) => {
    res.send('This is the contact page');
});

app.get('/about', (req, res) => {
    res.render('about.html');
});

// Endpoint of REST Functionality

app.get('/api/products', (req, res) => {
    itemDB.find({}, function(error, data){
        if(error){
            console.log("Error reading data", error)
            res.status(500);
            res.send(error);
        }
        res.json(data);
    });
});

app.get('/api/products/:user', (req, res) => {
    itemDB.find({ price : { $gte: 10 }}, function(error, data){
        if(error){
            console.log("Error reading data", error)
            res.status(500);
            res.send(error);
        }
        res.json(data);
    });
});

app.post('/api/products', (req, res) => {
    //get and assign ID  
    var item = new itemDB(req.body);

    // save the object to Db
    item.save(function(error, savedItem){
        if(error){
            console.log("Error, item was not saved on Mongo", error);
            res.status(500);
            res.send(error);
        }
        console.log("Item saved!");
        //send as a JSON
        res.status = 201;
        res.json(savedItem);
    });
});

//Listen to db connection events
db.on('error', function (error) {
    console.log("Error connection to Mongo Server", error);
});

db.on('open', function(){
    console.log('Db is alive');

    // Schemas
    var itemSchema = mongoose.Schema({
        title: String,
        description: String,
        price: Number,
        image: String,
        category: String,
        user: String
    });

    itemDB = mongoose.model("itemsCh4", itemSchema);
});

app.listen(8080, function () {
    console.log('Server listening on http://localhost:8080');
}); 
