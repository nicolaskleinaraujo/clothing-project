// Imports
const router = require("express").Router()
const orderController = require("../controllers/order/index")

// Routes
router.route("/").post((req, res) => orderController.createOrderController(req, res))

module.exports = router
