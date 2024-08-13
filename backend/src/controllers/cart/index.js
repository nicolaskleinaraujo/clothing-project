// Controllers
const addProductController = require("./addProduct/addProductController")
const calculatePriceController = require("./calculatePrice/calculatePriceController")
const deliveryController = require("./delivery/deliveryController")
const removeProductController = require("./removeProduct/removeProductController")

// Exporting all controllers
const cartController = {
    addProductController,
    calculatePriceController,
    removeProductController,
    deliveryController,
}

module.exports = cartController
