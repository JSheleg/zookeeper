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



function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    //Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
        } else {
        personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one 
            // of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    //return the filtered results
    return filteredResults;
}

//id and array of animals, returns a single animal
function findById(id, animalsArray) {
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result;
}

function createNewAnimal(body,animalsArray){
  const animal = body;
  console.log(animal);
  
  animalsArray.push(animal);
  //write animal data to JSON
  fs.writeFileSync(
    path.join(__dirname,'./data/animals.json'),
    JSON.stringify({animals: animalsArray}, null, 2)

    // null means no edit to existing data
    //2 indicates we want to create white space between our values
  );

  return animal;
}

function validateAnimal(animal) {
  if (!animal.name || typeof animal.name !== 'string') {
    return false;
  }
  if (!animal.species || typeof animal.species !== 'string') {
    return false;
  }
  if (!animal.diet || typeof animal.diet !== 'string') {
    return false;
  }
  if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
    return false;
  }
  return true;
}

//add route and accessing query
app.get('/api/animals', (req, res) => {
    let results = animals;
    //take in req.query as argument and return filtered array
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    console.log(req.query)
    res.json(results);
});

//param route
app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

//set up route on server to accept data to be use or stored server side
app.post('/api/animals', (req, res) => {
  //set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  //res.status().send() relays message back to user
  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }

  //add animal to json file and animals array in this function
  const animal = createNewAnimal(req.body, animals);
  // req.body is where our incoming content will be
  // console.log(req.body);
  res.json(animal);
});

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













