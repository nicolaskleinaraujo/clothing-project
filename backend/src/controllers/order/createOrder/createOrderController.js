const prisma = require("../../../db/client")
const calculateShipping = require("../../../config/shipping")
const createPayment = require("../../../config/mercadopago")

const createOrderController = async (req, res) => {
    const cart = req.signedCookies.cart
    const { userId } = req.body

    if (!cart) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Creates the payment payload
    const paymentPayload = {
        products: [],
        userName: "",
        userEmail: "",
    }

    // Gets the user address to calculate the shipping price
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { Address: true } })
    const shipping = await calculateShipping(user.Address[0].cep)
    let price = parseFloat(shipping.price)

    paymentPayload.userName = user.firstName
    paymentPayload.userEmail = user.email

    paymentPayload.products.push({
        name: "Frete",
        price: parseFloat(shipping.price),
    })

    // Validates the integrity of the product informed by the client
    for (let index = 0; index < cart.length; index++) {
        const product = await prisma.products.findUnique({
            where: { id: cart[index].productId },
            include: { sizes: true }
        })

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

        // Updates the product stock
        // const quantityToUpdate = product.quantity - cart[index].quantity
        await prisma.products.update({
            where: { id: cart[index].productId },
            data: { quantity: product.quantity - cart[index].quantity },
        })

        // Calculates the order price
        paymentPayload.products.push({
            name: `${cart[index].quantity}x ${product.name}`,
            price: product.price * cart[index].quantity,
        })
        price += product.price * cart[index].quantity
    }

    try {
        const payment = await createPayment(paymentPayload)

        // Creates the order products payload to create
        const orderProducts = cart.map(item => ({
            product: { connect: { id: item.productId } },
            size: { connect: { id: item.sizeId } },
            quantity: item.quantity,
        }))

        const order = await prisma.orders.create({
            data: {
                orderProducts: { create: orderProducts },
                userId,
                price,
            }
        })

        res.status(201).json({ msg: "Pedido feito com sucesso", order, payment })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = createOrderController
