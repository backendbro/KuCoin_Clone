const router = require('express').Router()
const UserAdminService = require('../CONTROLLER/UserAdminService')
const {protect, auth} = require('../MIDDLEWARES/protect')

router.use(protect, auth("Admin"))

router.get("/", UserAdminService.getUsers)
router.get("/:userId", UserAdminService.getSingleUser)


module.exports = router 