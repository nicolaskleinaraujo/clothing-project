const prisma = require("../../../db/client")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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

    // Checking if email or number is already cadastered
    const emailExists = await prisma.user.findUnique({ where: { email } })
    const numberExists = await prisma.user.findUnique({ where: { number } })

    if (emailExists || numberExists) {
        res.status(400).json({ msg: "Email ou numero de telefone já cadastrado" })
        return
    }

    // Hashing the password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    try {
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                number,
                password: hash,
                cep,
                city,
                district,
                street,
                houseNum,
            },
        })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = createUserController