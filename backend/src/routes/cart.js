// Imports
const router = require("express").Router()
const cartController = require("../controllers/cart/index")

// Routes
router.route("/").post((req, res) => cartController.addProductController(req, res))

module.exports = router
