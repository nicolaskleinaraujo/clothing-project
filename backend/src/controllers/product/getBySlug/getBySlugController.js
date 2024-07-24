const prisma = require("../../../db/client")

const getBySlugController = async() => {
    const slug = req.params.slug

    console.log(slug)

    try {
        const product = await prisma.products.findUnique({ where: { slug } })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = getBySlugController
