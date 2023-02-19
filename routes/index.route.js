const express = require('express');
const router = express.Router()
const roomTypeRoute = require('./roomtype.route')
const roomRoute = require('./room.route')
const userRoute = require('./user.route');
const healthRoute = require('./health.route');


router.use('/roomtype', roomTypeRoute);
router.use('/room', roomRoute);
router.use('/user', userRoute);

// this monitors my API for downtimes 
router.use('/health', healthRoute);

module.exports = router