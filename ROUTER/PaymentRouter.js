const router = require('express').Router()
const AdminService = require('../CONTROLLER/AdminService')
const {protect, auth} = require('../MIDDLEWARES/protect')



router.get("/", protect, auth('Admin'), AdminService.getUsers)
router.get("/:userId", protect, auth('Admin'), AdminService.getSingleUser)
router.post("/", protect, auth('Admin'), AdminService.makeDeposit)
router.get('/deposits', protect, auth('Admin'), AdminService.getDeposits)
router.get('/deposits/:id', protect,  auth('Admin'), AdminService.getSingleDeposits)

module.exports = router 