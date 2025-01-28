import prisma from "../../../db/client"
import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response } from "express"

interface jwtInfos extends JwtPayload {
    id: number,
}

const tryAuthController = async(req: Request, res: Response) => {
    const refreshToken: string = req.signedCookies.refresh

    if (!refreshToken) {
        res.status(400).json({ msg: "Falha ao tentar autenticação" })
        return
    }

    try {
        const refreshJwt = jwt.verify(refreshToken, process.env.JWT_SECRET as string) as jwtInfos

        // Getting user from ID inside token
        const user = await prisma.user.findUnique({ where: { id: refreshJwt.id } })
        if (!user) {
            res.status(404).json({ msg: "Falha ao tentar autenticação" })
            return
        }

        // Creating the access and refresh JWT Token
        const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" })

        res.cookie("access", newAccessToken, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 60 * 60 * 1000,
        })

        res.status(200).json({ msg: "Logado com sucesso", user })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default tryAuthController
