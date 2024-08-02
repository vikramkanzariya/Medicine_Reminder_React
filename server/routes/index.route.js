const {Router} = require("express")
const userRoutes = require("./user.route")
const medicationRoutes = require('./medication.route')
const router = Router();

router.use('/', userRoutes)
router.use('/medication',medicationRoutes)

module.exports = router;
