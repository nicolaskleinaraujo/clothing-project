const prisma = require("../../../db/client")

const createOrderController = async (req, res) => {
    const { orderData, userId } = req.body

    if (!orderData) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Creates the order product payload to create
    const orderProducts = orderData.map(item => ({
        product: { connect: { id: item.productId } },
        size: { connect: { id: item.sizeId } },
        quantity: item.quantity,
    }))

    try {
        const order = await prisma.orders.create({
            data: {
                orderProducts: { create: orderProducts },
                userId,
            }
        })

        res.status(201).json({ msg: "Pedido feito com sucesso", order })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = createOrderController
