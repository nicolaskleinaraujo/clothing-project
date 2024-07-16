const prisma = require("../../../db/client")

const sortCategoryController = async (req, res) => {
    try {
        const categories = await prisma.categories.findMany()

        res.status(200).json({ msg: "Pesquisa feita com sucesso", categories })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = sortCategoryController
