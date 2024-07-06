// Controllers
const createAddressController = require("./createAddress/createAddressController")
const deleteAddressController = require("./deleteAddress/deleteAddressController")
const updateAddressController = require("./updateAddress/updateAddressController")

// Exporting all controllers
const userController = {
    createAddressController,
    updateAddressController,
    deleteAddressController,
}

module.exports = userController
