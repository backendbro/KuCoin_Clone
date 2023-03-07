const router = require('express').Router()
const ContactService = require('../controller/ContactService')
const {protect, auth } = require('../middlewares/protect')

router.use(protect)

router.post('/user', auth("User"), ContactService.userMessenger)
router.post('/admin', auth("Admin"), ContactService.adminMessenger)

module.exports = router

