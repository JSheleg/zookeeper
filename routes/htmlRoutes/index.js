const path = require('path');
const router = require('express').Router();

//add route to index.html and respond with HTML page displayed in browser
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
  
//route to /animals
router.get('/animals', (req, res) => {
res.sendFile(path.join(__dirname, '../../public/animals.html'));
});
  
//route to zookeepers
router.get('/zookeepers', (req, res) => {
res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});
  
//wildcard route, recieve homepage as a response for unknown/undefined page route. 
//this should always be the last route
router.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;