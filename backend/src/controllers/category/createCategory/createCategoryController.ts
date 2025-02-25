import prisma from "../../../db/client"
import { Request, Response } from "express"

const createCategoryController = async (req: Request, res: Response) => {
    const { name } = req.body

    if (name === "") {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    const categoryExists = await prisma.categories.findUnique({ where: { name } })
    if (categoryExists) {
        res.status(400).json({ msg: "Nome de categoria já esta em uso" })
        return
    }

    try {
        const category = await prisma.categories.create({ data: { name } })

        res.status(201).json({ msg: "Categoria criada com sucesso", category })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

export default createCategoryController
