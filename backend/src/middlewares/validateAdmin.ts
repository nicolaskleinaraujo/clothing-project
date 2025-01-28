import prisma from "../db/client"
import { Request, Response, NextFunction } from "express"

const validateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = Number(req.body.userId)

    if (isNaN(userId)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
        res.status(404).json({ msg: "Usuario não encontrado" })
        return
    }

    if (!user.isAdmin) {
        res.status(401).json({ msg: "Usuario não é admin" })
        return
    }

    next()
}

export default validateAdmin
