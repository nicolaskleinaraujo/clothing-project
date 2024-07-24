const prisma = require("../../../db/client")

const getBySlugController = async(req, res) => {
    const slug = req.params.slug

    try {
        const product = await prisma.products.findFirst({ where: { slug }, include: { sizes: true } })

        res.status(200).json({ msg: "Produto achado com sucesso", product })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = getBySlugController