import prisma from "../../../db/client"
import { Request, Response } from "express"

const getByUserController = async(req: Request, res: Response) => {
    const id = parseInt(req.body.id)

    if (isNaN(id)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        const address = await prisma.address.findMany({ where: { userId: id } })

        if (!address || address.length === 0) {
            res.status(404).json({ msg: "Endereço não encontrado" })
            return
        }

        res.status(200).json({ msg: "Endereços encontrados", address })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

export default getByUserController
