import prisma from "../../../db/client"
import { Request, Response } from "express"

const sortCategoryController = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.categories.findMany({ orderBy: { id: "asc" } })
        const sizes = await prisma.sizes.findMany({ orderBy: { id: "asc" } })

        res.status(200).json({ msg: "Pesquisa feita com sucesso", categories, sizes })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default sortCategoryController
