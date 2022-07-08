require('dotenv').config();

const path = require('path');
const express = require('express');
const axios = require('axios');
const logMethod = require('./Middleware');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(logMethod());

// console.log(process.env.SECRET_KEY);

// to API

app.use('/*', (req, res) => {
  // res.sendStatus(599);

  axios.request({
    method: req.method,
    url: process.env.API_URL + req.url,
    data: req.body,
    params: req.query,
    headers: { Authorization: process.env.API_KEY },
  }).then((response) => {
    logMethod(req.method, req.url, req);
    res.status(200).send(response.data);
  }).catch((err) => {
    console.log('API error: ', err);
    res.sendStatus(500);
  });
});

// app.listen(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
