const prisma = require("../../../db/client")
const fs = require("node:fs")
const path = require("node:path")

const updateImageController = async (req, res) => {
    const {
        id,
    } = req.body

    const fileName = req.file.filename

    // Checking if the provided product ID is valid
    const product = await prisma.products.findUnique({ where: { id } })
    if (!product) {
        res.status(404).json({ msg: "Produto não encontrado" })
        return
    }
}

module.exports = updateImageController
