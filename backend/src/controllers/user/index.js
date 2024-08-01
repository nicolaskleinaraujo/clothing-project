// Controllers
const createUserController = require("./createUser/createUserController")
const deleteUserController = require("./deleteUser/deleteUserController")
const updateUserController = require("./updateUser/updateUserController")
const createLoginController = require("./createLogin/createLoginController")
const tryAuthController = require("./tryAuth/tryAuthController")

// Exporting all controllers
const userController = {
    createUserController,
    updateUserController,
    deleteUserController,
    createLoginController,
    tryAuthController,
}

module.exports = userController
