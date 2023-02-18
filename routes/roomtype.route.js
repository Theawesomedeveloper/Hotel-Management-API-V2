const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate.middleware');
const authorize = require('../middlewares/authorise.middleware');
const roomTypeController = require('../controllers/roomtype.controller');
const {validateUserInput} = require('../middlewares/validation.middleware');


router.post('/', authenticate, authorize('admin'), validateUserInput('roomtype'), roomTypeController.createRoomType);
router.patch('/:roomType', authenticate, authorize('admin'), roomTypeController.editRoomType);
router.delete('/:roomType', authenticate, authorize('admin'), roomTypeController.deleteRoomType);
router.get('/:roomType', authenticate, roomTypeController.fetchOneRoomType);
router.get('/', authenticate, roomTypeController.fetchAllRoomTypes);

module.exports = router


