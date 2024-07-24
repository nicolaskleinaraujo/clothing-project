const prisma = require("../../../db/client")
const calculateShipping = require("../../../config/shipping")

const createOrderController = async (req, res) => {
    const cart = req.signedCookies.cart
    const { userId } = req.body

    if (!cart) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Creates the order product payload to create
    const orderProducts = cart.map(item => ({
        product: { connect: { id: item.productId } },
        size: { connect: { id: item.sizeId } },
        quantity: item.quantity,
    }))

    // Validates the integrity of the product informed by the client
    let price = 0
    for (let index = 0; index < orderProducts.length; index++) {
        const id = cart[index].productId

        const product = await prisma.products.findUnique({ where: { id }, include: { sizes: true } })
        if (!product) {
            res.status(400).json({ msg: "Pedido invalido" })
            return
        }

        if (!product.avaiable) {
            res.status(400).json({ msg: "Pedido invalido" })
            return
        }

        if (product.quantity < cart[index].quantity) {
            res.status(400).json({ msg: "Pedido invalido" })
            return
        }

        const sizeAvaiable = product.sizes.some(size => size.id === cart[index].sizeId)
        if (!sizeAvaiable) {
            res.status(400).json({ msg: "Pedido invalido" })
            return
        }

        // Removes the product from the stock
        const quantityToUpdate = product.quantity - cart[index].quantity
        await prisma.products.update({
            where: { id },
            data: { quantity: quantityToUpdate },
        })

        // Calculates the order price
        price += product.price
    }

    // Gets the user address to calculate the shipping
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { Address: true } })
    const shipping = await calculateShipping(user.Address[0].cep)
    price += parseInt(shipping.price)

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
