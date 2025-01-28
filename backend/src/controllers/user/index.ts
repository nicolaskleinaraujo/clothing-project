// Controllers
import createUserController from "./createUser/createUserController"
import deleteUserController from "./deleteUser/deleteUserController"
import updateUserController from "./updateUser/updateUserController"
import createLoginController from "./createLogin/createLoginController"
import tryAuthController from "./tryAuth/tryAuthController"
import removeAuthController from "./removeAuth/removeAuthController"
import getUserByIdController from "./getUserById/getUserByIdController"

// Exporting all controllers
export const userController = {
    createUserController,
    updateUserController,
    deleteUserController,
    createLoginController,
    tryAuthController,
    removeAuthController,
    getUserByIdController,
}
