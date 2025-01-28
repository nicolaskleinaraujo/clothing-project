import prisma from "../../../db/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"

const createUserController = async (req: Request, res: Response) => {
    const {
        firstName,
        lastName,
        email,
        password,
        isGoogle,
    } = req.body

    if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        (!isGoogle && password === "")
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if email is already cadastered
    const emailExists = await prisma.user.findUnique({ where: { email } })
    if (emailExists) {
        res.status(400).json({ msg: "Email ou numero de telefone já cadastrado" })
        return
    }

    try {
        let user
        if (!isGoogle) {
            // Hashing the password
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            user = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: hash,
                    isGoogle,
                },
            })
        } else {
            user = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    isGoogle,
                }
            })
        }

        // Creating the access and refresh JWT Token
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

        res.status(200).json({ msg: "Usuario criado com sucesso", user })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default createUserController
