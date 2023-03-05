
const router = require('express').Router()
const UserService = require('../CONTROLLER/UserService')
const {protect} = require('../MIDDLEWARES/protect')
const UserSchema = require('../model/UserSchema')

router.post('/register', UserService.register)
router.post('/login', UserService.login)
router.put('/confirm-pin', UserService.confirmPin)
router.put('/resend-pin', UserService.resendConfirmPin)
router.post('/forgot-password', UserService.forgotPassword)
router.put('/reset-password', UserService.resetPassword)
router.put('/reset-current-password', protect, UserService.resetCurrentPassword)





module.exports = router 