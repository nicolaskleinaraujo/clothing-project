const prisma = require("../../../db/client")

const adminSortController = async(req, res) => {
    const { paid, received } = req.query

    // Creating the where payload used to sort the products
    let orders 

    try {
        if (paid !== "" && received === "") {
            orders = await prisma.orders.findMany({ where: { paid } })
        } else if (paid === "" && received !== "") {
            orders = await prisma.orders.findMany({ where: { received } })
        }
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

module.exports = adminSortController
