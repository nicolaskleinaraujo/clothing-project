const prisma = require("../../../db/client")

const sortById = async(req, res) => {
    const { id, userId } = req.body

    if (isNaN(id) || isNaN(userId)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        const order = await prisma.orders.findUnique({
            where: { id: parseInt(id) },
            include: { orderProducts: { include: { product: true } }},
        })

        if (!order) {
            res.status(404).json({ msg: "Pedido não encontrado" })
            return
        }

        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (order.userId != userId && !user.isAdmin) {
            res.status(401).json({ msg: "Usuario não é admin" })
            return
        }

        res.status(200).json({ msg: "Pesquisa feita com sucesso", order })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = sortById
