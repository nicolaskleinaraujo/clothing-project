import prisma from "../db/client"
import { Request, Response, NextFunction } from "express"

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = Number(req.body.userId)

    // Checking if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
        res.status(404).json({ msg: "Usuario não encontrado" })
        return
    }

    next()
}

export default validateUser
