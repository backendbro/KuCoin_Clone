const router = require('express').Router()
const WithDrawalService = require('../controller/WithDrawalService')
const {protect, auth } = require('../middlewares/protect')

router.use(protect)
router.post('/request', auth("User"),WithDrawalService.withDrawalRequest)
router.get('/', auth("Admin"), WithDrawalService.getWithDrawalRequests)
router.get('/single-user', WithDrawalService.getWithDrawalRequestsForOneUser)
router.get('/single-withdraw', auth("Admin"), WithDrawalService.getSingleWithDrawalRequests)
router.put('/confirm-withdraw', auth("Admin"), WithDrawalService.confirmWithDrawalRequest)

module.exports = router