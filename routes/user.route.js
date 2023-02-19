const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

const { validateUserInput } = require('../middlewares/validation.middleware');
const authenticate = require('../middlewares/authenticate.middleware');

router.post('/register', validateUserInput('user'), userController.createUser);
router.post('/login', validateUserInput('user'), userController.fetchUser);
router.patch('/update', authenticate, userController.updateUser);
router.post('/logout', userController.logoutUser);


module.exports = router;

