const express = require('express')
const router = express.Router()

// Middlewares
const UserValidation = require('../middlewares/userValidation')

// Controllers
const UserController = require('../controller/userController')

// User
router.post('/user/login', UserController.login)
router.post('/user', UserValidation.verifyData, UserController.create)
router.get('/user/:id', UserValidation.verifyId, UserController.show)
router.put('/user/:id', UserValidation.verifyData, UserValidation.verifyId, UserController.update)
router.delete('/user/:id', UserValidation.verifyId, UserController.delete)

module.exports = router