const prisma = require("../../../db/client")

const sortByUserController = async(req, res) => {
    const { id, userId } = req.body

    if (isNaN(id) || isNaN(userId)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (id != userId && !user.isAdmin) {
            res.status(401).json({ msg: "Usuario não é admin" })
            return
        }

        const orders = await prisma.orders.findMany({ where: { userId: id }, include: { orderProducts: true } })

        res.status(200).json({ msg: "Pesquisa feita com sucesso", orders })
    } catch (error) {
        res.status(500).json({ msg: "Erro intero, tente novamente" })
    }
}

module.exports = sortByUserController