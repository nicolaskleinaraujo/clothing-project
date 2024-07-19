// Imports
const router = require("express").Router()
const orderController = require("../controllers/order/index")

// Routes
router.route("/").post((req, res) => orderController.createOrderController(req, res))
router.route("/").delete((req, res) => orderController.deleteOrderController(req, res))

module.exports = router
