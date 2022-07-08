require('dotenv').config();

const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')));

// console.log(process.env.SECRET_KEY);

// to API
app.use('/*', (req, res) => {
  res.sendStatus(599);
});

// app.listen(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
