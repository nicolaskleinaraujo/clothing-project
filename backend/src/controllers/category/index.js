const createCategoryController = require("./createCategory/createCategoryController")
const deleteCategoryController = require("./deleteCategory/deleteCategoryController")
const updateCategoryController = require("./updateCategory/updateCategoryController")

const categoryController = {
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
}

module.exports = categoryController
