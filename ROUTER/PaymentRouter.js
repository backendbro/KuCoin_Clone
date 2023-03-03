const router = require('express').Router()
const AdminService = require('../CONTROLLER/AdminService')
const {protect, auth} = require('../MIDDLEWARES/protect')

 router.use(auth('Admin'))

router.get("/", AdminService.getUsers)
router.get("/:userId", AdminService.getSingleUser)
router.post("/", AdminService.makeDeposit)
router.get('/deposits', AdminService.getDeposits)
router.get('/deposits/:id', AdminService.getSingleDeposits)

module.exports = router 