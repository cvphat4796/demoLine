const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

const app = express();
let logs = [];

const config = {
  channelAccessToken: '+swsmXFhxHO7gKIpcgVwXn3Jg2P7epkH1UizP9naS0yXoWtib6VNfYnQKneOwztlK00tbTDIZxpdDsBVUf3vAmnQKEG6EkoWRl1U0T7jMUsdX5GF18Ow1MIpI8Lj1Wl5aNjGwGu/0EHjh4hfBdVzYgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '1078b60e709428299135cee602e32864'
}


app.post('/webhook', middleware(config), (req, res) => {
    logs.push("post: " + JSON.stringify(req.body) + "\n"); 
    logs.push("post: " + JSON.stringify(req.headers) + "\n"); 
    console.log(req.body.events)
    res.send(200) // req.body will be webhook event object
})

app.post('/webhook-zoho',  (req, res) => {
    console.log('=============body===========');
    console.log(req.body);
    console.log('=============headers===========');
    console.log(req.headers);
    res.send(200) // req.body will be webhook event object
})

//app.use(bodyParser.json());

app.get('/log', (req, res) => {
  res.json(logs) // req.body will be webhook event object
})

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.sendStatus(401).send(err.signature)
    return
  } else if (err instanceof JSONParseError) {
    res.sendStatus(400).send(err.raw)
    return
  }
  next(err) // will throw default 500
})

app.listen(port, function(){
    console.log("started")
})