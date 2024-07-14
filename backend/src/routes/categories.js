// Imports
const router = require("express").Router()
const categoryController = require("../controllers/category/index")

// Routes
router.route("/").post((req, res) => categoryController.createCategoryController(req, res))

module.exports = router
