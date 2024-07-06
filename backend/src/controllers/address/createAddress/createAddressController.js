const prisma = require("../../../db/client")
const jwt = require("jsonwebtoken")

const createAddressController = async(req, res) => {
    const {
        cep,
        city,
        district,
        street,
        houseNum,
        userId,
    } = req.body

    parseInt(houseNum, userId)

    if (
        cep === "" ||
        district === "" ||
        street === "" ||
        houseNum === undefined ||
        userId === undefined
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if the provided ID is valid
    const userExists = await prisma.user.findUnique({ where: { id: userId }, include: { Address } })
    if (!userExists) {
        res.status(404).json({ msg: "Usuario não encontrado" })
        return
    }

    // Checking if the user already have a address
    const addressExists = await prisma.address.findMany({ where: { userId } })
    if (addressExists) {
        res.status(401).json({ msg: "Endereço já cadastrado" })
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
        const newAddress = await prisma.address.create({
            data: {
                cep,
                city,
                district,
                street,
                houseNum,
                userId,
            },
        })

        res.status(201).json({ msg: "Endereço cadastrado", newAddress })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = createAddressController
