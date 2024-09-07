const prisma = require("../../../db/client")
const currencyHandler = require("../../../config/currencyHandler")

const updateProductController = async (req, res) => {
    const {
        id,
        name,
        description,
        price,
        sizes,
        colors,
        quantity,
        categoryId,
    } = req.body

    if (
        isNaN(id) ||
        name === "" ||
        description === "" ||
        price === "" ||
        sizes === "" ||
        colors === "" ||
        isNaN(quantity) ||
        isNaN(categoryId)
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if the provided product ID is valid
    const product = await prisma.products.findUnique({ where: { id }, include: { sizes: true } })
    if (!product) {
        res.status(404).json({ msg: "Produto não encontrado" })
        return
    }

    // Transforming the sizes string into an array
    const sizesArray = sizes.split(", ").map(size => size.trim())

    // Creating the disconnect and connectOrCreate prisma payload
    const disconnect = product.sizes.map(size => ({ size: size.size }))
    const connectOrCreate = sizesArray.map(size => ({
        where: { size: size },
        create: { size: size },
    }))

    try {
        const formatedPrice = currencyHandler(price)

        const newProduct = await prisma.products.update({
            where: { id },
            data: {
                name,
                description,
                price: formatedPrice,
                sizes: { disconnect, connectOrCreate },
                colors,
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
            },
        })

        res.status(200).json({ msg: "Produto atualizado com sucesso", newProduct })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

module.exports = updateProductController
