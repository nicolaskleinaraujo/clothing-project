// Imports
const router = require("express").Router()
const cartController = require("../controllers/cart/index")
const validateUser = require("../middlewares/validateUser")
const validateToken = require("../middlewares/validateToken")

// Routes
router.route("/").post(validateToken, validateUser, (req, res) => cartController.addProductController(req, res))

module.exports = router
