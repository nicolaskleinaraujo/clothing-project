const prisma = require("../../../db/client")

const createOrderController = async (req, res) => {
    const { orderData, userId } = req.body

    /*  [
            { productId: 1, sizeId: 1, quantity: 2 },
            { productId: 2, sizeId: 2, quantity: 1 },
            { productId: 3, sizeId: 3, quantity: 3 }
        ] */

    if (!orderData) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        const order = await prisma.orders.create({
            data: {
                orderProducts: {
                    create: orderData.map(item => ({
                        product: {
                            connect: { id: item.productId },
                        },
                        size: {
                            connect: { id: item.sizeId },
                        },
                        quantity: item.quantity,
                    }))
                }
            }
        })

        res.status(201).json({ msg: "Pedido feito com sucesso", order })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = createOrderController
