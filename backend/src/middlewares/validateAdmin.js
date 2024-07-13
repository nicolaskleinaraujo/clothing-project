const prisma = require("../db/client")

const validateAdmin = async (req, res, next) => {
    const userId = req.body.userId

    if (isNaN(userId)) {
        res.status(400).json({ msg: "Informações insuficientes1" })
        return
    }

    // Checking if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
        res.status(404).json({ msg: "Usuario não encontrado" })
        return
    }

    if (!user.isAdmin) {
        res.status(401).json({ msg: "Usuario não é admin" })
        return
    }

    next()
}

module.exports = validateAdmin
