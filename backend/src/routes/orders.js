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
router.route("/user").post(validateToken, validateUser, (req, res) => orderController.sortByUserController(req, res))
router.route("/ipn").post((req, res) => orderController.ipnController(req, res))
router.route("/id").post(validateToken, validateUser, (req, res) => orderController.sortById(req, res))
router.route("/sort").post(validateToken, validateAdmin, (req, res) => orderController.adminSortController(req, res))
router.route("/card").post((req, res) => orderController.cardPayment(req, res))

module.exports = router
