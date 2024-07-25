// Imports
const router = require("express").Router()
const couponController = require("../controllers/coupon/index")
const validateAdmin = require("../middlewares/validateAdmin")

// Routes
router.route("/").post(validateAdmin, (req, res) => couponController.createCouponController(req, res))

module.exports = router
