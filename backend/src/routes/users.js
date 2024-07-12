// Imports
const router = require("express").Router()
const userController = require("../controllers/user/index")
const validateUser = require("../middlewares/validateUser")
const validateToken = require("../middlewares/validateToken")

// Routes
router.route("/").post((req, res) => userController.createUserController(req, res))
router.route("/").put(validateToken, validateUser, (req, res) => userController.updateUserController(req, res))
router.route("/").delete(validateUser, (req, res) => userController.deleteUserController(req, res))
router.route("/login").post((req, res) => userController.createLoginController(req, res))

module.exports = router
