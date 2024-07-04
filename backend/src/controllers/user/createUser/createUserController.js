const prisma = require("../../../db/client")

const createUserController = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        number,
        password,
        cep,
        city,
        district,
        street,
        houseNum,
    } = req.body

    parseInt(houseNum)

    if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        number === "" ||
        password === "" ||
        cep === "" ||
        city === "" ||
        district === "" ||
        street === "" ||
        houseNum === undefined
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    const emailExists = await prisma.user.findUnique({ where: { email } })
    const numberExists = await prisma.user.findUnique({ where: { number } })

    if (emailExists || numberExists) {
        res.status(400).json({ msg: "Email ou numero de telefone já cadastrado" })
        return
    }

    
}

module.exports = createUserController