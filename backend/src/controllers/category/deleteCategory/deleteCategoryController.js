const prisma = require("../../../db/client")

const deleteCategoryController = async (req, res) => {
    const { id } = req.body

    if (isNaN(id)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    const category = await prisma.categories.findUnique({ where: { id } })
    if (!category) {
        res.status(404).json({ msg: "Categoria não encontrada" })
        return
    }

    try {
        await prisma.categories.delete({ where: { id } })

        res.status(200).json({ msg: "Categoria deletada com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

module.exports = deleteCategoryController
