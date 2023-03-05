const router = require('express').Router()
const WithDrawalService = require('../controller/WithDrawalService')
const {protect, auth } = require('../middlewares/protect')

router.post('/request', protect, WithDrawalService.withDrawalRequest)

module.exports = router