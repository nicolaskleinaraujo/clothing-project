// Controllers
const createUserController = require("./createUser/createUserController")
const deleteUserController = require("./deleteUser/deleteUserController")
const updateUserController = require("./updateUser/updateUserController")
const createLoginController = require("./createLogin/createLoginController")
const tryAuthController = require("./tryAuth/tryAuthController")
const removeAuthController = require("./removeAuth/removeAuthController")
const getUserByIdController = require("./getUserById/getUserByIdController")

// Exporting all controllers
const userController = {
    createUserController,
    updateUserController,
    deleteUserController,
    createLoginController,
    tryAuthController,
    removeAuthController,
    getUserByIdController,
}

module.exports = userController
