const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT || 3000

let objectArray = [];

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
const fs = require('fs');
var util = require('util');
app.route('/')
    .get(function(req, res){
 
        objectArray.push("get: " + util.inspect(req.params) + "\n"); 
        res.sendStatus(200);
    });
    app.route('/')
    .post(function(req, res){
 
        objectArray.push("get: " + util.inspect(req.params) + "\n"); 
        res.sendStatus(200);
    });
    app.route('/log')
    .get(function(req, res){
        
        res.send(objectArray);
    })
// let routes = require('./api/routes') //importing route
// routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)

console.log('RESTful API server started on: ' + port)