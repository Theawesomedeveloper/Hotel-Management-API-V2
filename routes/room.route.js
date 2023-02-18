const roomController = require('../controllers/room.controller');
const express = require('express');
const authenticate = require('../middlewares/authenticate.middleware');
const authorize = require('../middlewares/authorise.middleware');
const {validateUserInput} = require('../middlewares/validation.middleware');
const router = express.Router()


router.post('/', authenticate, authorize('admin'), validateUserInput('room'), roomController.createRoom)
router.delete('/:roomId', authenticate, authorize('admin'), roomController.deleteRoom);
router.patch('/:roomId', authenticate, authorize('admin'), roomController.editRoom);
router.get('/:roomId', authenticate, roomController.fetchOneRoom);
router.get('/', authenticate, roomController.fetchAllRooms)

module.exports = router