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

    // Transforming the sizes string into an array
    const sizesArray = sizes.split(", ").map(size => size.trim())

    // Creating the connectOrCreate prisma payload
    const connectOrCreate = sizesArray.map(size => ({
        where: { size: size },
        create: { size: size },
    }))

    try {
        const product = await prisma.products.create({
            data: {
                name,
                description,
                image: imageName,
                price: parseFloat(price),
                sizes: { connectOrCreate },
                colors,
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
            },
            include: { sizes: true }
        })

        res.status(201).json({ msg: "Produto criado com sucesso", product })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = createProductController
