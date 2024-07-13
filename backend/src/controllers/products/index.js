// Controllers
const createProductController = require("./createProduct/createProductController")
const updateImageController = require("./updateImage/updateImageController")
const updateProductController = require("./updateProduct/updateProductController")

// Exporting all controllers
const productController = {
    createProductController,
    updateProductController,
    updateImageController,
}

module.exports = productController
