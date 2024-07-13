const prisma = require("../../../db/client")

const createProductController = async (req, res) => {
    const {
        name,
        description,
        price,
        sizes,
        colors,
        quantity,
        categoryId,
    } = req.body

    const imageName = req.file.filename

    if (
        name === "" ||
        description === "" ||
        isNaN(price) ||
        sizes === "" ||
        colors === "" ||
        isNaN(quantity) ||
        isNaN(categoryId)
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        const product = await prisma.products.create({
            data: {
                name,
                description,
                image: imageName,
                price: parseFloat(price),
                sizes,
                colors,
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
            }
        })

        res.status(201).json({ msg: "Produto criado com sucesso", product })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = createProductController
