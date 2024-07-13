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

    try {
        await prisma.products.update({ 
            where: { id }, 
            data: { avaiable: !product.avaiable } 
        })

        res.status(200).json({ msg: "Produto atualizado com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

module.exports = changeAvaiableController
