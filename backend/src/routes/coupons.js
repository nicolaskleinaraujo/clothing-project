// Imports
const router = require("express").Router()
const couponController = require("../controllers/coupon/index")
const validateAdmin = require("../middlewares/validateAdmin")

// Routes
router.route("/").post(validateAdmin, (req, res) => couponController.createCouponController(req, res))
router.route("/").patch(validateAdmin, (req, res) => couponController.invalidateCouponController(req, res))
router.route("/").delete(validateAdmin, (req, res) => couponController.deleteCouponController(req, res))
router.route("/").get(validateAdmin, (req, res) => couponController.getAllCouponsController(req, res))

module.exports = router
