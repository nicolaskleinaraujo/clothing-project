// Controllers
import createCategoryController from "./createCategory/createCategoryController"
import deleteCategoryController from "./deleteCategory/deleteCategoryController"
import sortCategoryController from "./sortCategory/sortCategoryController"
import updateCategoryController from "./updateCategory/updateCategoryController"

// Exporting all controllers
export const categoryController = {
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
    sortCategoryController,
}
