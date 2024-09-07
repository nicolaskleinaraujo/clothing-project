// Imports
const router = require("express").Router()
const productController = require("../controllers/product/index")
const validateAdmin = require("../middlewares/validateAdmin")

// Multer
const upload = require("../config/multer")

// Routes
router.route("/").post(upload.array("file"), (req, res) => productController.createProductController(req, res))
router.route("/").put(validateAdmin, (req, res) => productController.updateProductController(req, res))
router.route("/").patch(upload.single("file"), (req, res) => productController.updateImageController(req, res))
router.route("/").delete(validateAdmin, (req, res) => productController.deleteProductController(req, res))
router.route("/avaiable").patch(validateAdmin, (req, res) => productController.changeAvaiableController(req, res))
router.route("/").get((req, res) => productController.sortProductController(req, res))
router.route("/slug/:slug").get((req, res) => productController.getBySlugController(req, res))

module.exports = router
