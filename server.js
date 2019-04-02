const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
const fs = require('fs');
var util = require('util');
app.route('/')
    .get(function(req, res){
 
        fs.appendFileSync("logs/log.txt", "get: " + util.inspect(req.params) + "\n"); 
        res.sendStatus(200);
    });
    app.route('/')
    .post(function(req, res){
 
        fs.appendFileSync("logs/log.txt",  "post: " + util.inspect(req.body) + "\n"); 
        res.sendStatus(200);
    });
    app.route('/log')
    .get(function(req, res){
        
        const file = fs.createWriteStream("/logs/log.txt");
        response.pipe(file);
    })
// let routes = require('./api/routes') //importing route
// routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)

console.log('RESTful API server started on: ' + port)