import prisma from "../../../db/client"
import { Prisma, Products } from "@prisma/client"
import { Request, Response } from "express"

interface ImagesInfos {
    id: number
    filename: string
    content: string | Buffer
}

interface ProductsInfos extends Products {
    Images: ImagesInfos[]
}

const sortProductController = async (req: Request, res: Response) => {
    const category = req.query.category as number | undefined
    const sizes = req.query.sizes as string | undefined
    const page = req.query.page as number | undefined

    if (page === undefined || isNaN(page)) {
        res.status(400).json({ msg: "Erro de paginação" })
        return
    }

    try {
        // Creating the where payload used to sort the products
        const whereClause: Prisma.ProductsWhereInput = {}

        if (category && sizes) {
            const sizesArray = sizes.split(",").map(size => size.trim())

            whereClause.AND = [
                { categoryId: Number(category) }, 
                ...sizesArray.map(size => ({
                    sizes: {
                        some: {
                            size: size,
                        },
                    },
                }))
            ]
        } else if (sizes) {
            const sizesArray = sizes.split(",").map(size => size.trim())

            whereClause.AND = sizesArray.map(size => ({
                sizes: {
                    some: {
                        size: size,
                    },
                },
            }))
        } else if (category) {
            whereClause.categoryId = Number(category)
        }

        // Handles the pagination system
        let skip = (Number(Number(page) - 1)) * 12
        const take = 12

        const totalProducts = await prisma.products.count({ where: whereClause })
        const totalPages = Math.ceil(Number(totalProducts) / 12)

        if (Number(page) === 0) {
            skip = 0
            return
        }

        const products: ProductsInfos[] = await prisma.products.findMany({
            where: whereClause,
            skip,
            take,
            include: { 
                sizes: true,
                Images: { orderBy: { id: "asc" } },
            },
        })

        products.forEach(product => product.Images[0].content = product.Images[0].content.toString("base64"))

        res.status(200).json({ msg: "Pesquisa feita com sucesso", products, totalPages })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default sortProductController
