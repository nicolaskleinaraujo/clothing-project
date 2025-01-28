import prisma from "../db/client"
import { Request, Response, NextFunction } from "express"

const validateAddress = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = Number(req.body.userId)

    if (isNaN(userId)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if user exists
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { Address: true },
    })

    if (!user) {
        res.status(404).json({ msg: "Usuario não encontrado" })
        return
    }

    if (user.Address.length === 0) {
        res.status(401).json({ msg: "Adicione seu endereço" })
        return
    }

    next()
}

export default validateAddress
