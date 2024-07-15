const prisma = require("../../../db/client")

const updateCategoryController = async (req, res) => {
    const { id, name } = req.body

    if (isNaN(id) || name === "") {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checks if the category name is in use
    const nameInUse = await prisma.categories.findUnique({ where: { name } })
    if (nameInUse.id != id) {
        res.status(400).json({ msg: "Nome já em uso" })
        return
    }

    // Checks if the provided category ID is valid
    const category = await prisma.categories.findUnique({ where: { id } })
    if (!category) {
        res.status(404).json({ msg: "Categoria não encontrada" })
        return
    }
}

module.exports = updateCategoryController
