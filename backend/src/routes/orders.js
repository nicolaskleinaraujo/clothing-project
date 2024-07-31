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
router.route("/").patch(validateToken, validateUser, (req, res) => orderController.updateStatusController(req, res))
router.route("/").get(validateToken, validateUser, (req, res) => orderController.sortByUserController(req, res))
router.route("/ipn").post((req, res) => orderController.ipnController(req, res))
router.route("/order/:id").get(validateToken, validateUser, (req, res) => orderController.sortById(req, res))

module.exports = router
