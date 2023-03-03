const router = require('express').Router()
const AdminService = require('../CONTROLLER/AdminService')
const {protect, auth} = require('../MIDDLEWARES/protect')

 router.use(auth('Admin'))

router.get("/", protect, AdminService.getUsers)
router.get("/:userId", protect, AdminService.getSingleUser)
router.post("/", protect, AdminService.makeDeposit)
router.get('/deposits', protect, AdminService.getDeposits)
router.get('/deposits/:id', protect, AdminService.getSingleDeposits)

module.exports = router 