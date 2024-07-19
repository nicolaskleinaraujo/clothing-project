// Controllers
const addProductController = require("./addProduct/addProductController")
const calculatePriceController = require("./calculatePrice/calculatePriceController")

// Exporting all controllers
const cartController = {
    addProductController,
    calculatePriceController,
}

module.exports = cartController
