//require npm express
const express = require('express');
//import fs to write data to animals.json file
const fs = require('fs');
//provides utilities for working with file and directory paths
const path = require('path');
//require data
const {animals} = require('./data/animals');
//set environment variable for Heroku
const Port = process.env.PORT || 3001;
//initiate server
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//file path to location and instruct the server to make these files static resourses
//all front end code can be access via public folder
app.use(express.static('public'));

//use router set up in apiRoutes, / endpont will connect to HTML routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//set up server
app.listen(Port, () => {
  console.log(`API server now on port ${Port}`);
});













