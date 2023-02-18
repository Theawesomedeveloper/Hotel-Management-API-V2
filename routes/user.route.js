const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

const {validateUserInput} = require('../middlewares/validation.middleware');

router.post('/register', validateUserInput('user'), userController.createUser)
router.post('/login', validateUserInput('user'), userController.fetchUser)


module.exports = router;

