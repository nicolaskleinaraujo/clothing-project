// Controllers
const createProductController = require("./createProduct/createProductController")
const deleteProductController = require("./deleteProduct/deleteProductController")
const updateImageController = require("./updateImage/updateImageController")
const updateProductController = require("./updateProduct/updateProductController")

// Exporting all controllers
const productController = {
    createProductController,
    updateProductController,
    updateImageController,
    deleteProductController,
}

module.exports = productController
