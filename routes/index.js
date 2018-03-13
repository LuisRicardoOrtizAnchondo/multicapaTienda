const express = require('express');
const homeworkController = require('../controllers/homework');
const login = require('../controllers/login')
const router = express.Router();

router.use(login.auth)

router.get('/', function(req, res, next){
    res.send(200);
});


module.exports = router;