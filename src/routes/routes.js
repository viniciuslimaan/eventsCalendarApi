const express = require('express')
const router = express.Router()

// Middlewares
const UserValidation = require('../middlewares/userValidation')
const EventValidation = require('../middlewares/eventValidation')
const Verification = require('../middlewares/Verification')

// Controllers
const UserController = require('../controller/userController')
const EventController = require('../controller/eventController')

// User
router.post('/user/login', UserValidation.verifyPass, UserController.login)
router.post('/user', UserValidation.verifyData, UserController.create)
router.get('/user/:id', Verification, UserValidation.verifyId, UserController.show)
router.put('/user/:id', Verification, UserValidation.verifyData, UserValidation.verifyId, UserController.update)
router.delete('/user/:id', Verification, UserValidation.verifyId, UserController.delete)

// Event
router.post('/event', Verification, EventValidation.verifyData, EventController.create)
router.get('/event/all/:author', Verification, EventValidation.verifyAuthor, EventController.all)
router.get('/event/:id', Verification, EventValidation.verifyId, EventController.show)
router.put('/event/:id', Verification, EventValidation.verifyData, EventController.update)
router.delete('/event/:id', Verification, EventValidation.verifyId, EventController.delete)

module.exports = router