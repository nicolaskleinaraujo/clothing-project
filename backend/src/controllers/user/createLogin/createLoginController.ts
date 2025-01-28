import prisma from "../../../db/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"

const createLoginController = async (req: Request, res: Response) => {
    const { email, password, isGoogle } = req.body

    if (email === "" || (!isGoogle && password === "")) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checks if the provided email matchs a user
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        res.status(404).json({ msg: "Email ou senha incorretos" })
        return
    }

    if (user.isGoogle !== isGoogle) {
        res.status(400).json({ msg: "Forma de login incorreta" })
        return
    }

    // Checks if the provided password is correct
    if (!isGoogle) {
        const testPassword = bcrypt.compareSync(password, user.password as string)
        if (!testPassword) {
            res.status(400).json({ msg: "Email ou senha incorretos" })
            return
        }
    } else if (isGoogle) {
        if (!user.isGoogle) {
            res.status(400).json({ msg: "Login incorreto, tente novamente" })
            return
        }
    }

    // Removes password from user to send for the client
    user.password = ""

    // Creating the access and refresh token
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" })
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "7d" })

    res.cookie("access", accessToken, {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 60 * 60 * 1000,
    })

    res.cookie("refresh", refreshToken, {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json({ msg: "Login feito com sucesso", user })
}

export default createLoginController
