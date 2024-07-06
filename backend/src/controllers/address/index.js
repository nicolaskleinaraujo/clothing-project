// Controllers
const createAddressController = require("./createAddress/createAddressController")
const updateAddressController = require("./updateAddress/updateAddressController")

// Exporting all controllers
const userController = {
    createAddressController,
    updateAddressController,
}

module.exports = userController
