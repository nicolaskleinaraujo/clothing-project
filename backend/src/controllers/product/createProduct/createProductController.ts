import prisma from "../../../db/client"
import slugify from "slugify"
import sharp from "sharp"
import currencyHandler from "../../../config/currencyHandler"
import { Request, Response } from "express"

const createProductController = async (req: Request, res: Response) => {
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
        price === "" ||
        sizes === "" ||
        colors === "" ||
        isNaN(quantity) ||
        isNaN(categoryId) ||
        !Array.isArray(req.files)
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Transforming the sizes string into an array
    const sizesArray = sizes.split(", ").map((size: string) => size.trim())

    // Creating the connectOrCreate prisma payload
    const connectOrCreate = sizesArray.map((size: string) => ({
        where: { size: size },
        create: { size: size },
    }))

    // Creating the product slug
    const slug = slugify(name + " " + Date.now(), { lower: true })

    try {
        const formatedPrice = currencyHandler(price)

        const product = await prisma.products.create({
            data: {
                name,
                description,
                price: formatedPrice,
                sizes: { connectOrCreate },
                colors,
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                slug,
            },
            include: { sizes: true }
        })

        // Typing the files correctly
        const files: Express.Multer.File[] = req.files

        const imagesInfos = await Promise.all(files.map(async(file: Express.Multer.File) => {
            return {
                filename: file.fieldname,
                content: await sharp(file.buffer).resize(1024, 1350).toFormat("webp").toBuffer(),
                productId: product.id
            }
        }))

        const images = await prisma.images.createMany({
            data: imagesInfos
        })

        res.status(201).json({ msg: "Produto criado com sucesso", product, images })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default createProductController
