// Controllers
const createProductController = require("./createProduct/createProductController")
const updateProductController = require("./updateProduct/updateProductController")

// Exporting all controllers
const productController = {
    createProductController,
    updateProductController,
}

module.exports = productController
