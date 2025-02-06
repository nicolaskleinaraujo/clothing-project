import prisma from "../../../db/client"
import { Products } from "@prisma/client"
import { Request, Response } from "express"

interface ImagesInfos {
    id: number
    filename: string
    productId: number
    content: string | Buffer
}

interface ProductInfos extends Products {
    Images: ImagesInfos[]
}

const getBySlugController = async(req: Request, res: Response) => {
    const slug = req.params.slug

    if (!slug) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        const product: ProductInfos | null = await prisma.products.findUnique({ 
            where: { slug }, 
            include: { 
                sizes: { orderBy: { id: "asc" } },
                Images: { orderBy: { id: "asc" } },
            },
        })

        if (!product) {
            res.status(404).json({ msg: "Produto não encontrado" })
            return
        }

        product.Images.forEach(image => {
            image.content = image.content.toString("base64")
        })

        res.status(200).json({ msg: "Produto achado com sucesso", product })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default getBySlugController
