const prisma = require("../../../db/client")
const jwt = require("jsonwebtoken")

const updateAddressController = async (req, res) => {
    const {
        id,
        cep,
        city,
        district,
        street,
        houseNum,
        userId,
    } = req.body

    parseInt(id, houseNum, userId)

    if (
        cep === "" ||
        city === "" ||
        district === "" ||
        street === "" ||
        houseNum === undefined ||
        userId === undefined
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if the provided user ID is valid
    const userExists = await prisma.user.findUnique({ where: { id: userId } })
    if (!userExists) {
        res.status(404).json({ msg: "Usuario não encontrado" })
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
        const updatedAddress = await prisma.address.update({
            where: { id },
            data: {
                cep,
                city,
                district,
                street,
                houseNum,
            },
        })

        res.status(200).json({ msg: "Endereço atualizado com sucesso", updatedAddress })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = updateAddressController