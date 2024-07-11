// Imports
const router = require("express").Router()
const addressController = require("../controllers/address/index")
const validateUser = require("../middlewares/validateUser")

// Routes
router.route("/").post(validateUser, (req, res) => addressController.createAddressController(req, res))
router.route("/").put((req, res) => addressController.updateAddressController(req, res))
router.route("/").delete((req, res) => addressController.deleteAddressController(req, res))

module.exports = router
