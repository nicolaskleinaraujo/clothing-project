// Imports
const router = require("express").Router()
const productController = require("../controllers/products/index")
const validateAdmin = require("../middlewares/validateAdmin")

// Multer
const multer = require("multer")
const storage = require("../config/multer")
const upload = multer({ storage })

// Routes
router.route("/").post(upload.single("file"), (req, res) => productController.createProductController(req, res))
router.route("/").put(validateAdmin, (req, res) => productController.updateProductController(req, res))
router.route("/").patch(upload.single("file"), (req, res) => productController.updateImageController(req, res))
router.route("/").delete(validateAdmin, (req, res) => productController.deleteProductController(req, res))
router.route("/avaiable").patch(validateAdmin, (req, res) => productController.changeAvaiableController(req, res))

module.exports = router
