const prisma = require("../../../db/client")

const changeAvaiableController = async (req, res) => {
    const id = req.body.id

    if (isNaN(id)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checks if provided product ID is valid
    const product = await prisma.products.findUnique({ where: { id } })
    if (!product) {
        res.status(404).json({ msg: "Produto não encontrado" })
        return
    }
}

module.exports = changeAvaiableController
