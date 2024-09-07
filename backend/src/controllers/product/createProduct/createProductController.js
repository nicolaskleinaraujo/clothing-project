const prisma = require("../../../db/client")
const slugify = require("slugify")

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

    // Creating the product slug
    const slug = slugify(name + " " + Date.now(), { lower: true })

    try {
        const product = await prisma.products.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                sizes: { connectOrCreate },
                colors,
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                slug,
            },
            include: { sizes: true }
        })

        const imagesInfos = req.files.map(file => {
            return {
                filename: file.fieldname,
                content: file.buffer,
                productId: product.id
            }
        })

        const images = await prisma.images.createMany({
            data: imagesInfos
        })

        res.status(201).json({ msg: "Produto criado com sucesso", product, images })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = createProductController
