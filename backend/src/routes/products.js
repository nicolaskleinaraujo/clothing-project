// Imports
const router = require("express").Router()
const productController = require("../controllers/products/index")

// Multer
const multer = require("multer")
const storage = require("../config/multer")
const upload = multer({ storage })

// Routes
router.route("/").post(upload.single("file"), (req, res) => productController.createProductController(req, res))
router.route("/").put((req, res) => productController.updateProductController(req, res))
router.route("/").patch(upload.single("file"), (req, res) => productController.updateImageController(req, res))
router.route("/").delete((req, res) => productController.deleteProductController(req, res))

module.exports = router
