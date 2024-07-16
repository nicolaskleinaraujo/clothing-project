const prisma = require("../../../db/client")

const sortProductController = async (req, res) => {
    const category = req.query.category
    const sizes = req.query.sizes

    // Creating the where used to sort the products
    const whereClause = {}

    if (category && sizes) {
        sizesArray = sizes.split(",").map(size => size.trim())

        whereClause.AND = [
            { categoryId: parseInt(category) }, 

            ...sizesArray.map(size => ({
                sizes: {
                    some: {
                        size: size,
                    },
                },
            }))
        ]
    } else if (category) {
        whereClause.categoryId = parseInt(category)
    } else if (sizes) {
        sizesArray = sizes.split(",").map(size => size.trim())

        whereClause.AND = sizesArray.map(size => ({
            sizes: {
                some: {
                    size: size,
                },
            },
        }))
    }
}

module.exports = sortProductController
