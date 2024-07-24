// Imports
const router = require("express").Router()
const orderController = require("../controllers/order/index")
const validateUser = require("../middlewares/validateUser")
const validateToken = require("../middlewares/validateToken")
const validateAdmin = require("../middlewares/validateAdmin")
const validateAddress = require("../middlewares/validateAddress")

// Routes
router.route("/").post(validateToken, validateUser, validateAddress, (req, res) => orderController.createOrderController(req, res))
router.route("/").delete(validateToken, validateAdmin, (req, res) => orderController.deleteOrderController(req, res))
router.route("/").patch(validateToken, validateUser, (req, res) => orderController.updateReceivedController(req, res))

module.exports = router
