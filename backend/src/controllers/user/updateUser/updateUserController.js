const prisma = require("../../../db/client")
const bcrypt = require("bcryptjs")

const updateUserController = async (req, res) => {
    const {
        userId,
        firstName,
        lastName,
        email,
        password,
        oldPassword,
    } = req.body

    parseInt(userId)

    if (
        userId === undefined ||
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        password === "" ||
        oldPassword === ""
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Getting user info
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
        res.status(404).json({ msg: "Usuario não encontrado" })
        return
    }

    // Blocks user action if is logged with google
    if (user.isGoogle) {
        res.status(401).json({ msg: "Usuario não pode alterar informações" })
        return
    }

    // Checking if email belongs to other user
    const emailExists = await prisma.user.findUnique({ where: { email } })

    if (emailExists && emailExists.id !== user.id) {
        res.status(400).json({ msg: "Email ou numero de telefone já cadastrado" })
        return
    }

    // Checking old password
    const checkOldPassword = await bcrypt.compare(oldPassword, user.password)
    if (!checkOldPassword) {
        res.status(400).json({ msg: "Senha antiga incorreta" })
        return
    }

    // Hashing the new password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                firstName,
                lastName,
                email,
                password: hash,
            },
        })

        res.status(200).json({ msg: "Informações atualizadas com sucesso", updatedUser })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = updateUserController
