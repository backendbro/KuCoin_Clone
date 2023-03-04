const router = require('express').Router()
const DepositService = require('../CONTROLLER/DepositService')
const {protect, auth} = require('../MIDDLEWARES/protect')

router.use(protect, auth("Admin"))

router.post("/", DepositService.makeDeposit)
router.get('/', DepositService.getDeposits)
router.get('/:depositId', DepositService.getDeposits)

module.exports = router