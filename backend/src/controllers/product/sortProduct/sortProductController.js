const prisma = require("../../../db/client")

const sortProductController = async (req, res) => {
    const category = req.query.category
    const size = req.query.size

    const whereClause = {}

    console.log(category)
    console.log(size)

    if (category && size) {
        whereClause.categoryId = parseInt(category)
        whereClause.sizes = size
    } else if (category) {
        whereClause.categoryId = parseInt(category)
    } else if (size) {
        whereClause.sizes = size
    }

    console.log(whereClause)

    const products = await prisma.products.findMany({
        where: whereClause
    })

    res.status(200).json({ msg: "Feito", products })
}

module.exports = sortProductController
