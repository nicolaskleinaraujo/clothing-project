const createCategoryController = require("./createCategory/createCategoryController")
const deleteCategoryController = require("./deleteCategory/deleteCategoryController")
const sortCategoryController = require("./sortCategory/sortCategoryController")
const updateCategoryController = require("./updateCategory/updateCategoryController")

const categoryController = {
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
    sortCategoryController,
}

module.exports = categoryController
