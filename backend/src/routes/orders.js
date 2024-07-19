// Imports
const router = require("express").Router()
const orderController = require("../controllers/order/index")
const validateUser = require("../middlewares/validateUser")
const validateToken = require("../middlewares/validateToken")
const validateAdmin = require("../middlewares/validateAdmin")

// Routes
router.route("/").post(validateToken, validateUser, (req, res) => orderController.createOrderController(req, res))
router.route("/").delete(validateToken, validateAdmin, (req, res) => orderController.deleteOrderController(req, res))

module.exports = router
