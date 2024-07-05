const prisma = require("../../../db/client")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const updateUserController = async (req, res) => {
    const {
        id,
        firstName,
        lastName,
        email,
        number,
        password,
        oldPassword,
        cep,
        city,
        district,
        street,
        houseNum,
    } = req.body

    parseInt(id, houseNum)

    if (
        id === undefined ||
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        number === "" ||
        password === "" ||
        oldPassword === "" ||
        cep === "" ||
        city === "" ||
        district === "" ||
        street === "" ||
        houseNum === undefined
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if user exists
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
        res.status(400).json({ msg: "Usuario não encontrado" })
        return
    }

    // Checking if email or number belongs to other user
    const emailExists = await prisma.user.findUnique({ where: { email } })
    const numberExists = await prisma.user.findUnique({ where: { number } })

    if (emailExists && emailExists.id !== user.id) {
        res.status(400).json({ msg: "Email ou numero de telefone já cadastrado" })
        return
    }

    if (numberExists && numberExists.id !== user.id) {
        res.status(400).json({ msg: "Email ou numero de telefone já cadastrado" })
        return
    }

    // Checking old password
    const checkOldPassword = await bcrypt.compare(oldPassword, user.password)
    if (!checkOldPassword) {
        res.status(400).json({ msg: "Senha antiga incorreta" })
        return
    }
}

module.exports = updateUserController
