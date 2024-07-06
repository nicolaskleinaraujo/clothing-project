// Imports
const router = require("express").Router()
const addressController = require("../controllers/address/index")

// Routes
router.route("/").post((req, res) => addressController.createAddressController(req, res))

module.exports = router
