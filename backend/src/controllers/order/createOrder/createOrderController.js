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

    // Validates the integrity of the product informed by the client
    let price = 0
    for (let index = 0; index < orderProducts.length; index++) {
        const id = orderData[index].productId

        const product = await prisma.products.findUnique({ where: { id }, include: { sizes: true } })
        if (!product) {
            res.status(400).json({ msg: "Pedido invalido" })
            return
        }

        if (!product.avaiable) {
            res.status(400).json({ msg: "Pedido invalido" })
            return
        }

        if (product.quantity < orderData[index].quantity) {
            res.status(400).json({ msg: "Pedido invalido" })
            return
        }

        const sizeAvaiable = product.sizes.some(size => size.id === orderData[index].sizeId)
        if (!sizeAvaiable) {
            res.status(400).json({ msg: "Pedido invalido" })
            return
        }

        // Calculates the order price
        price += product.price
    }

    try {
        const order = await prisma.orders.create({
            data: {
                orderProducts: { create: orderProducts },
                userId,
                price,
            }
        })

        res.status(201).json({ msg: "Pedido feito com sucesso", order })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = createOrderController
