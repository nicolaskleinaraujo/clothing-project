// Controllers
const createAddressController = require("./createAddress/createAddressController")
const deleteAddressController = require("./deleteAddress/deleteAddressController")
const getByUserController = require("./getByUser/getByUserController")
const updateAddressController = require("./updateAddress/updateAddressController")

// Exporting all controllers
const userController = {
    createAddressController,
    updateAddressController,
    deleteAddressController,
    getByUserController,
}

module.exports = userController
