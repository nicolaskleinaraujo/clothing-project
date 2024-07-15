const prisma = require("../../../db/client")

const updateCategoryController = async (req, res) => {
    const { id, name } = req.body

    if (isNaN(id) || name === "") {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checks if the category name is in use
    const nameInUse = await prisma.categories.findUnique({ where: { name } })
    if (nameInUse && nameInUse.id != id) {
        res.status(400).json({ msg: "Nome já em uso" })
        return
    }

    // Checks if the provided category ID is valid
    const category = await prisma.categories.findUnique({ where: { id } })
    if (!category) {
        res.status(404).json({ msg: "Categoria não encontrada" })
        return
    }

    try {
        const newCategory = await prisma.categories.update({
            where: { id },
            data: { name },
        })

        res.status(200).json({ msg: "Categoria atualizada com sucesso", newCategory })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

module.exports = updateCategoryController
