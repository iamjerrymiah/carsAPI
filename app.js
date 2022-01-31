const express = require('express');
const { json } = require('express');
const carRouter = require('./routes/carRoute');

const app = express();

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/cars', carRouter);

module.exports = app;