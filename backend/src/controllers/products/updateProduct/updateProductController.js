const prisma = require("../../../db/client")
const fs = require("node:fs")
const path = require("node:path")

const updateProductController = async (req, res) => {
    const {
        id,
        name,
        price,
        sizes,
        colors,
        quantity,
    } = req.body

    const imageName = req.file.filename

    if (
        isNaN(id) ||
        name === "" ||
        isNaN(price) ||
        sizes === "" ||
        colors === "" ||
        isNaN(quantity)
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if the provided product ID is valid
    const product = await prisma.products.findUnique({ where: id })
    if (!product) {
        res.status(404).json({ msg: "Produto não encontrado" })
        return
    }
}

module.exports = updateProductController
