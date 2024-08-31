const prisma = require("../../../db/client")

const getUserByIdController = async(req, res) => {
    const { id, userId } = req.body

    if (isNaN(id) || isNaN(userId)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        const user = await prisma.user.findUnique({ where: { id } })

        if (!user) {
            res.status(404).json({ msg: "Usuario não encontrado" })
            return
        }

        // Checks if the request has been send by the user
        if (user.id !== parseInt(userId)) {
            res.status(401).json({ msg: "Usuario não autorizado" })
            return
        }

        // Removes user password from the payload
        delete user.password

        res.status(200).json({ msg: "Usuario encontrado", user })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = getUserByIdController
