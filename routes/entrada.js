const express = require('express');
const login = require('../controllers/login')
const router = express.Router();

//router.use(login.auth)
/*
router.get('/', homeworkController.findUserHomeworks);
router.get('/new', homeworkController.newHomework);
router.post('/new', homeworkController.saveHomework);
router.get('/modify/:id', homeworkController.modifyHomeworkView);
router.post('/modify', homeworkController.modifyHomework);
router.post('/markAsDone', homeworkController.markHomeworkAsDone);
*/
module.exports = router;