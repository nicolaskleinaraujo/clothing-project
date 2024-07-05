// Controllers
const createUserController = require("./createUser/createUserController")
const updateUserController = require("./updateUser/updateUserController")

// Exporting all controllers
const userController = {
    createUserController,
    updateUserController,
}

module.exports = userController
