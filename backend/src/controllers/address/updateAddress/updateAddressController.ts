import prisma from "../../../db/client"
import { Request, Response } from "express"

const updateAddressController = async (req: Request, res: Response) => {
    const {
        id,
        cep,
        state,
        city,
        district,
        street,
        houseNum,
        complement,
        name,
        number,
        userId,
    } = req.body

    if (
        isNaN(id) ||
        cep === "" ||
        state === "" ||
        city === "" ||
        district === "" ||
        street === "" ||
        isNaN(houseNum) ||
        name === "" ||
        number === "" ||
        isNaN(userId)
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if the provided address ID is valid and belongs to user
    const addressExists = await prisma.address.findUnique({ where: { id: parseInt(id) } })
    if (!addressExists) {
        res.status(404).json({ msg: "Endereço não encontrado" })
        return
    }

    if (addressExists.userId != userId) {
        res.status(401).json({ msg: "Endereço informado não pertence ao usuario" })
        return
    }

    try {
        const updatedAddress = await prisma.address.update({
            where: { id: Number(id) },
            data: {
                cep,
                state,
                city,
                district,
                street,
                houseNum: Number(houseNum),
                complement,
                name,
                number,
            },
        })

        res.status(200).json({ msg: "Endereço atualizado com sucesso", updatedAddress })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default updateAddressController
