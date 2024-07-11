// Imports
const router = require("express").Router()
const userController = require("../controllers/user/index")
const validateUser = require("../middlewares/validateUser")

// Routes
router.route("/").post((req, res) => userController.createUserController(req, res))
router.route("/").put(validateUser, (req, res) => userController.updateUserController(req, res))
router.route("/").delete(validateUser, (req, res) => userController.deleteUserController(req, res))

module.exports = router
