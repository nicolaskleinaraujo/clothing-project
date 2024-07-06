// Controllers
const createAddressController = require("./createAddress/createAddressController")

// Exporting all controllers
const userController = {
    createAddressController,
}

module.exports = userController
