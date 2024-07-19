const prisma = require("../../../db/client")

const deleteOrderController = async(req, res) => {
    const { id } = req.body

    if (isNaN(id)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        await prisma.orderProduct.deleteMany({ where: { orderId: id } })
        await prisma.orders.delete({ where: { id } })

        res.status(200).json({ msg: "Pedido excluido com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = deleteOrderController
