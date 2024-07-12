const prisma = require("../../../db/client")
const bcrypt = require("bcryptjs")

const deleteUserController = async (req, res) => {
    const {
        userId,
        password,
    } = req.body

    parseInt(userId)

    if (userId === undefined || password === "") {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if the provided password matches user password
    const user = await prisma.user.findUnique({ where: { id: userId } })

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        res.status(401).json({ msg: "Senha incorreta" })
        return
    }

    try {
        await prisma.user.delete({ where: { id: userId } })

        res.clearCookie("access")
        res.clearCookie("refresh")

        res.status(200).json({ msg: "Usuario deletado com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = deleteUserController
