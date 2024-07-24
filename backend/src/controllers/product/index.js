// Controllers
const changeAvaiableController = require("./changeAvaiable/changeAvaiableController")
const createProductController = require("./createProduct/createProductController")
const deleteProductController = require("./deleteProduct/deleteProductController")
const getBySlugController = require("./getBySlug/getBySlugController")
const sortProductController = require("./sortProduct/sortProductController")
const updateImageController = require("./updateImage/updateImageController")
const updateProductController = require("./updateProduct/updateProductController")

// Exporting all controllers
const productController = {
    createProductController,
    updateProductController,
    updateImageController,
    deleteProductController,
    changeAvaiableController,
    sortProductController,
    getBySlugController,
}

module.exports = productController
