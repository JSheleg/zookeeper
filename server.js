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

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//file path to location and instruct the server to make these files static resourses
//all front end code can be access via public folder
app.use(express.static('public'));


//add route to index.html and respond with HTML page displayed in browser
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//route to /animals
app.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, './public/animals.html'));
});

//route to zookeepers
app.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

//wildcard route, recieve homepage as a response for unknown/undefined page route. 
//this should always be the last route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//set up server
app.listen(Port, () => {
  console.log(`API server now on port ${Port}`);
});













