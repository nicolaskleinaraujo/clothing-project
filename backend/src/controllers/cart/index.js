// Controllers
const addProductController = require("./addProduct/addProductController")
const calculatePriceController = require("./calculatePrice/calculatePriceController")
const removeProductController = require("./removeProduct/removeProductController")

// Exporting all controllers
const cartController = {
    addProductController,
    calculatePriceController,
    removeProductController,
}

module.exports = cartController
