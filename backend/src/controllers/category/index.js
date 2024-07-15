const createCategoryController = require("./createCategory/createCategoryController")
const updateCategoryController = require("./updateCategory/updateCategoryController")

const categoryController = {
    createCategoryController,
    updateCategoryController,
}

module.exports = categoryController
