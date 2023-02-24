const router = require('express').Router()
const UserService = require('../CONTROLLER/UserService')

router.post('/register', UserService.register)
router.post('/login', UserService.login)
router.put('/confirm-pin', UserService.confirmPin)

module.exports = router 