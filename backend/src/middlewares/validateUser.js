const prisma = require("../db/client")

const validateUser = async (req, res, next) => {
    const userId = req.body.userId

    // Checking if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
        res.status(404).json({ msg: "Usuario não encontrado" })
        return
    }

    next()
}

module.exports = validateUser
