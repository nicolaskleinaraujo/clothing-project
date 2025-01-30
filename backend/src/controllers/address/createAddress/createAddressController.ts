import prisma from "../../../db/client"
import { Request, Response } from "express"

const createAddressController = async(req: Request, res: Response) => {
    const {
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
        cep === "" ||
        state === "" ||
        city === "" ||
        district === "" ||
        street === "" ||
        houseNum === undefined ||
        name === "" ||
        number === "" ||
        userId === undefined
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if the user already have more than 3 address
    const addressExists = await prisma.address.findMany({ where: { userId: parseInt(userId) } })
    if (addressExists.length > 2) {
        res.status(401).json({ msg: "Numero máximo de endereços atingido" })
        return
    }

    try {
        const newAddress = await prisma.address.create({
            data: {
                cep,
                state,
                city,
                district,
                street,
                houseNum: parseInt(houseNum),
                complement,
                name,
                number,
                userId: parseInt(userId),
            },
        })

        res.status(201).json({ msg: "Endereço cadastrado", newAddress })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default createAddressController
