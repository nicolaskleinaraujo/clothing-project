// Controllers
const createUserController = require("./createUser/createUserController")
const deleteUserController = require("./deleteUser/deleteUserController")
const updateUserController = require("./updateUser/updateUserController")
const createLoginController = require("./createLogin/createLoginController")

// Exporting all controllers
const userController = {
    createUserController,
    updateUserController,
    deleteUserController,
    createLoginController,
}

module.exports = userController
