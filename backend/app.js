const express = require('express');
// const router = require('./routes/index.routes');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
// app.use('/api', router);

module.exports = app;
