// Imports
const router = require("express").Router()
const cartController = require("../controllers/cart/index")
const validateUser = require("../middlewares/validateUser")
const validateToken = require("../middlewares/validateToken")

// Routes
router.route("/").post(validateToken, validateUser, (req, res) => cartController.addProductController(req, res))
router.route("/").get(validateToken, validateUser, (req, res) => cartController.calculatePriceController(req, res))
router.route("/").delete(validateToken, validateUser, (req, res) => cartController.removeProductController(req, res))

module.exports = router
