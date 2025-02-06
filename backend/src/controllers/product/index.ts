// Controllers
import changeAvaiableController from "./changeAvaiable/changeAvaiableController"
import createProductController from "./createProduct/createProductController"
import deleteProductController from "./deleteProduct/deleteProductController"
import getBySlugController from "./getBySlug/getBySlugController"
import sortProductController from "./sortProduct/sortProductController"
import updateProductController from "./updateProduct/updateProductController"

// Exporting all controllers
export const productController = {
    createProductController,
    updateProductController,
    deleteProductController,
    changeAvaiableController,
    sortProductController,
    getBySlugController,
}
