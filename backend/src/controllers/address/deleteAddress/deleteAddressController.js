const prisma = require("../../../db/client")
const jwt = require("jsonwebtoken")

const deleteAddressController = async (req, res) => {
    const {
        id,
        userId,
    } = req.body

    parseInt(id, userId)

    if (id === undefined || userId === undefined) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if the provided address ID is valid
    const addressExists = await prisma.address.findUnique({ where: { id } })
    if (!addressExists) {
        res.status(404).json({ msg: "Endereço não encontrado" })
        return
    }

    // Checking the refresh token
    const cookie = req.signedCookies.refresh
    if (!cookie) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    // Verifying the JWT
    const jwtPayload = jwt.verify(cookie, process.env.JWT_SECRET)
    if (!jwtPayload) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    // Checking if the cookie matches the request id
    if (jwtPayload.id != userId) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    try {
        await prisma.address.delete({ where: { id } })

        res.status(200).json({ msg: "Endereço deletado com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = deleteAddressController
