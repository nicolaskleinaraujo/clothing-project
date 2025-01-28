import { Request, Response } from "express"

const removeAuthController = async(req: Request, res: Response) => {
    try {
        res.clearCookie("access")
        res.clearCookie("refresh")

        res.status(200).json({ msg: "Usuario saiu com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

export default removeAuthController
