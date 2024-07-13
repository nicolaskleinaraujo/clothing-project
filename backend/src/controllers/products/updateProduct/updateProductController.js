const prisma = require("../../../db/client")

const updateProductController = async (req, res) => {
    const {
        id,
        name,
        price,
        sizes,
        colors,
        quantity,
    } = req.body

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

    try {
        const newProduct = prisma.products.update({
            where: { id },
            data: {
                name,
                price,
                sizes,
                colors,
                quantity,
            }
        })

        res.status(200).json({ msg: "Produto atualizado com sucesso", newProduct })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

module.exports = updateProductController
