'use strict'

const express = require('express');
const bodyParser = require('body-parser')
let app = express();

// create application/json parser
const jsonParser = bodyParser.json();

// GET method route
app.get('/get', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/post', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  res.send(`POST request to the homepage, params: ${JSON.stringify(req.body)}`);
});

app.listen(3000, function () {
  console.log('server test app listening on port 3000!');
});