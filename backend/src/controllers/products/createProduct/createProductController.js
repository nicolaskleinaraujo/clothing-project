const prisma = require("../../../db/client")

const createProductController = async (req, res) => {
    const {
        name,
        price,
        sizes,
        colors,
        quantity,
    } = req.body

    const imageName = req.file.filename

    parseInt(quantity)
    parseFloat(price)

    if (
        name === "" ||
        isNaN(price) ||
        sizes === "" ||
        colors === "" ||
        isNaN(quantity)
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        const product = await prisma.products.create({
            data: {
                name,
                image: imageName,
                price,
                sizes,
                colors,
                quantity,
            }
        })

        res.status(201).json({ msg: "Produto criado com sucesso", product })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = createProductController
