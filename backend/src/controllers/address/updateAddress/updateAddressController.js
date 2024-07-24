const prisma = require("../../../db/client")

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

    // Checking if the provided address ID is valid and belongs to user
    const addressExists = await prisma.address.findUnique({ where: { id } })
    if (!addressExists) {
        res.status(404).json({ msg: "Endereço não encontrado" })
        return
    }

    if (addressExists.userId != userId) {
        res.status(401).json({ msg: "Endereço informado não pertence ao usuario" })
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