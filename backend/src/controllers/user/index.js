// Controllers
const createUserController = require("./createUser/createUserController")
const deleteUserController = require("./deleteUser/deleteUserController")
const updateUserController = require("./updateUser/updateUserController")
const createLoginController = require("./createLogin/createLoginController")
const tryAuthController = require("./tryAuth/tryAuthController")
const removeAuthController = require("./removeAuth/removeAuthController")

// Exporting all controllers
const userController = {
    createUserController,
    updateUserController,
    deleteUserController,
    createLoginController,
    tryAuthController,
    removeAuthController,
}

module.exports = userController
