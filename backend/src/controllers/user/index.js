// Controllers
const createUserController = require("./createUser/createUserController")
const deleteUserController = require("./deleteUser/deleteUserController")
const updateUserController = require("./updateUser/updateUserController")

// Exporting all controllers
const userController = {
    createUserController,
    updateUserController,
    deleteUserController,
}

module.exports = userController
