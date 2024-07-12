// Imports
const router = require("express").Router()
const addressController = require("../controllers/address/index")
const validateUser = require("../middlewares/validateUser")
const validateToken = require("../middlewares/validateToken")

// Routes
router.route("/").post(validateUser, (req, res) => addressController.createAddressController(req, res))
router.route("/").put(validateToken, validateUser, (req, res) => addressController.updateAddressController(req, res))
router.route("/").delete(validateToken, validateUser, (req, res) => addressController.deleteAddressController(req, res))

module.exports = router
