const prisma = require("../../../db/client")

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
        city === "" ||
        district === "" ||
        street === "" ||
        houseNum === undefined ||
        userId === undefined
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if the user already have a address
    const addressExists = await prisma.address.findMany({ where: { userId } })
    if (addressExists.length > 0) {
        res.status(401).json({ msg: "Endereço já cadastrado" })
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
