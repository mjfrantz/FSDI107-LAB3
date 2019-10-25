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
    res.json(items);
});

app.post('/api/products', (req, res) => {
    //get and assign ID 
    var item = req.body;
     item.id = nextId;
     nextId += 1;

    //store
     items.push(item);

    //send as a JSON
    res.status = 201;
    res.json(item);
});

app.listen(8080, function () {
    console.log('Server listening on http://localhost:8080');
}); 
