// Imports
const router = require("express").Router()
const addressController = require("../controllers/address/index")

// Routes
router.route("/").post((req, res) => addressController.createAddressController(req, res))
router.route("/").put((req, res) => addressController.updateAddressController(req, res))

module.exports = router
