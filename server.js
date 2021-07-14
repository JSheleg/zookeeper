//require data
const {animal} = require('./data/animals.json');
//require npm express
const express = require('express');
//initiate server
const app = express();

//set up server
app.listen(3001, () => {
    console.log(`API server now on port 3001`);
});

//add route
app.get('/api/animals', (req, res)=>{
    res.json(animals);
});











