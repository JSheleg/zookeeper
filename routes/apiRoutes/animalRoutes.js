
//start an instance of Router
const router = require('express').Router();

//import functions and animal objects
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

//add route and accessing query
router.get('/animals', (req, res) => {
    let results = animals;
    //take in req.query as argument and return filtered array
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    console.log(req.query)
    res.json(results);
});

//param route
router.get('/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

//set up route on server to accept data to be use or stored server side
router.post('/animals', (req, res) => {
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

//export router
module.exports  = router;