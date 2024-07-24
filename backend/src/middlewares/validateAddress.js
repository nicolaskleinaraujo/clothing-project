const prisma = require("../db/client")

const validateAddress = async (req, res, next) => {
    const userId = req.body.userId

    if (isNaN(userId)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if user exists
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { Address: true },
    })

    if (!user) {
        res.status(404).json({ msg: "Usuario não encontrado" })
        return
    }

    if (user.Address.length === 0) {
        res.status(401).json({ msg: "Adicione seu endereço" })
        return
    }

    next()
}

module.exports = validateAddress