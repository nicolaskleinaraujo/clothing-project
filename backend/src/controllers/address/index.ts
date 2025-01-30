// Controllers
import createAddressController from "./createAddress/createAddressController"
import deleteAddressController from "./deleteAddress/deleteAddressController"
import getByUserController from "./getByUser/getByUserController"
import updateAddressController from "./updateAddress/updateAddressController"

// Exporting all controllers
export const addressController = {
    createAddressController,
    updateAddressController,
    deleteAddressController,
    getByUserController,
}
