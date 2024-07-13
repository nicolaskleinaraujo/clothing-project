// Imports
const router = require("express").Router()
const productController = require("../controllers/products/index")

// Multer
const multer = require("multer")
const storage = require("../config/multer")
const upload = multer({ storage })

// Routes
router.route("/").post(upload.single("file"), (req, res) => productController.createProductController(req, res))

module.exports = router