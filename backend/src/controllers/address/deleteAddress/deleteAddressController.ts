import prisma from "../../../db/client"
import { Request, Response } from "express"

const deleteAddressController = async (req: Request, res: Response) => {
    const {
        id,
        userId,
    } = req.body

    parseInt(id, userId)

    if (id === undefined || userId === undefined) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if the provided address ID is valid and belongs to user
    const addressExists = await prisma.address.findUnique({ where: { id } })
    if (!addressExists) {
        res.status(404).json({ msg: "Endereço não encontrado" })
        return
    }

    if (addressExists.userId != userId) {
        res.status(401).json({ msg: "Endereço informado não pertence ao usuario" })
        return
    }

    try {
        await prisma.address.delete({ where: { id } })

        res.status(200).json({ msg: "Endereço deletado com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default deleteAddressController
