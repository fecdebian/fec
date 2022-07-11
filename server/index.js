require('dotenv').config();

const path = require('path');
const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

// to API

app.use('/*', (req, res) => {
  if (req.baseUrl !== '/favicon.ico') {
    axios.request({
      method: req.method,
      url: `${process.env.API_URL}${req.baseUrl}`,
      data: req.body,
      params: req.query,
      headers: { Authorization: process.env.API_KEY },
    }).then((response) => {
      res.status(200).send(response.data);
    }).catch((err) => {
      console.error('API error: ', err);
      res.sendStatus(500);
    });
  }
});

// app.listen(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
