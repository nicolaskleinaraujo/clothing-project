// Imports
const router = require("express").Router()
const cartController = require("../controllers/cart/index")
const validateUser = require("../middlewares/validateUser")
const validateToken = require("../middlewares/validateToken")
const validateAddress = require("../middlewares/validateAddress")

// Routes
router.route("/").post(validateToken, validateUser, (req, res) => cartController.addProductController(req, res))
router.route("/").get(validateToken, validateUser, validateAddress, (req, res) => cartController.calculatePriceController(req, res))

module.exports = router
