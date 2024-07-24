const prisma = require("../../../db/client")

const updateReceivedController = async(req, res) => {
    const id = parseInt(req.body.id)

    if (isNaN(id)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        const order = await prisma.orders.findUnique({ where: { id } })
        if (!order) {
            res.status(404).json({ msg: "Pedido não encontrado" })
            return
        }

        const updatedOrder = await prisma.orders.update({ where: { id }, data: { received: true } })

        res.status(200).json({ msg: "Pedido atualizado com sucesso", updatedOrder })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = updateReceivedController
