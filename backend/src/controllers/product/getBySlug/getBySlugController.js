const prisma = require("../../../db/client")

const getBySlugController = async(req, res) => {
    const slug = req.params.slug

    if (!slug) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        const product = await prisma.products.findUnique({ 
            where: { slug }, 
            include: { 
                sizes: { orderBy: { id: "asc" } },
                Images: { orderBy: { id: "asc" } },
            },
        })

        product.Images.map(image => {
            image.content = image.content.toString("base64")
        })

        res.status(200).json({ msg: "Produto achado com sucesso", product })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = getBySlugController
