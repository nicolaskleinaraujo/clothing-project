const prisma = require("../../../db/client")
const fs = require("node:fs")
const path = require("node:path")

const deleteProductController = async (req, res) => {
    const id = parseInt(req.body.id)

    if (isNaN(id)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checks if the provided product ID is valid
    const product = await prisma.products.findUnique({ where: { id }, include: { OrderProduct: true } })
    if (!product) {
        res.status(404).json({ msg: "Produto não encontrado" })
        return
    }

    try {
        // FIXME order deletion
        await prisma.images.deleteMany({ where: { productId: product.id } })
        await prisma.orderProduct.deleteMany({ where: { productId: product.id } })
        await prisma.products.delete({ where: { id } })

        res.status(200).json({ msg: "Produto deletado com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = deleteProductController
