import prisma from "../../../db/client"
import bcrypt from "bcryptjs"
import { Request, Response } from "express"

const deleteUserController = async (req: Request, res: Response) => {
    const {
        userId,
        password,
        isGoogle,
    } = req.body

    Number(userId)

    if (userId === undefined || (!isGoogle && password === "")) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if the provided password matches user password
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
        res.status(404).json({ msg: "Usuario não encontrado" })
        return
    }

    if (!user.isGoogle && isGoogle) {
        res.status(400).json({ msg: "Informações incorretas" })
        return
    }

    if (!isGoogle) {
        const checkPassword = bcrypt.compare(password, user.password as string)

        if (!checkPassword) {
            res.status(401).json({ msg: "Senha incorreta" })
            return
        }
    }

    try {
        await prisma.orders.deleteMany({ where: { userId } })
        await prisma.address.deleteMany({ where: { userId } })
        await prisma.user.delete({ where: { id: userId } })

        res.clearCookie("access")
        res.clearCookie("refresh")

        res.status(200).json({ msg: "Usuario deletado com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default deleteUserController
