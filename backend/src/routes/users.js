// Imports
const router = require("express").Router()
const userController = require("../controllers/user/index")

// Routes
router.route("/").post((req, res) => userController.createUserController(req, res))
router.route("/").put((req, res) => userController.updateUserController(req, res))

module.exports = router
