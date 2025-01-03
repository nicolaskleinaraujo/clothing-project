// Imports
const router = require("express").Router()
const categoryController = require("../controllers/category/index")

// Routes
router.route("/").post((req, res) => categoryController.createCategoryController(req, res))
router.route("/").put((req, res) => categoryController.updateCategoryController(req, res))
router.route("/").delete((req, res) => categoryController.deleteCategoryController(req, res))
router.route("/").get((req, res) => categoryController.sortCategoryController(req, res))

module.exports = router
