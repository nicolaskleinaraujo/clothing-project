const prisma = require("../../../db/client")
const calculateShipping = require("../../../config/shipping")
const createPayment = require("../../../config/mercadopago")
const { v4: uuidv4 } = require('uuid')

const createOrderController = async (req, res) => {
    const cart = req.signedCookies.cart
    const { userId, coupon, addressIndex, delivery } = req.body

    if (!cart || delivery === "") {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Creates the payment payload
    const paymentPayload = {
        price: 0,
        userName: "",
        userEmail: "",
        external_reference: uuidv4(),
    }

    // Gets the user address to calculate the shipping price
    let price = 0
    let shippingDate = 0
    let shippingType = ""
    let addressId = 0
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) }, include: { Address: true } })
    if (user.Address.length != 0) {
        const shipping = await calculateShipping(user.Address[addressIndex].cep)
        const selectedShipping = shipping.filter(service => service.name === delivery)[0]

        price += parseFloat(selectedShipping.price)
        shippingDate = parseInt(selectedShipping.delivery_time)
        shippingType = selectedShipping.name
        addressId = user.Address[addressIndex].id
    } else if (user.Address.length == 0) {
        res.status(400).json({ msg: "Cadastre seu endereço primeiramente" })
        return
    }

    paymentPayload.userName = user.firstName
    paymentPayload.userEmail = user.email

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
        await prisma.products.update({
            where: { id: cart[index].productId },
            data: { quantity: product.quantity - cart[index].quantity },
        })

        // Calculates the order price
        price += parseFloat((product.price * cart[index].quantity).toFixed(2))
    }

    // Calculates and aplies discount to order price
    if (coupon) {
        const searchCoupon = await prisma.coupon.findUnique({
            where: { code: coupon },
            include: { users: true }, 
        })

        if (!searchCoupon || !searchCoupon.valid) {
            res.status(404).json({ msg: "Codigo de cupom incorreto" })
            return
        }

        const alreadyUsed = searchCoupon.users.find(userCoupon => userCoupon.id === userId)
        if (alreadyUsed) {
            res.status(400).json({ msg: "Cupom já foi utilizado" })
            return
        }

        if (searchCoupon.minimum > price) {
            res.status(400).json({ msg: `Pedido minimo de R$${searchCoupon.minimum}` })
            return
        }

        if (searchCoupon.minimum < price) {
            if (searchCoupon.percentage) {
                const discount = price * (searchCoupon.quantity / 100)
                price -= parseFloat(discount)
            } else if (!searchCoupon.percentage) {
                const discount = price - searchCoupon.quantity
                price -= parseFloat(discount)
            }

            await prisma.coupon.update({
                where: { code: coupon },
                data: { users: { connect: [{ id: userId }] } }
            })
        }
    }

    price = parseFloat(price.toFixed(2))
    paymentPayload.price = price

    try {
        const payment = await createPayment(paymentPayload)

        // Creates the order products payload to create
        const orderProducts = cart.map(item => ({
            product: { connect: { id: item.productId } },
            size: { connect: { id: item.sizeId } },
            quantity: item.quantity,
            color: item.color
        }))

        const order = await prisma.orders.create({
            data: {
                orderProducts: { create: orderProducts },
                userId,
                addressId,
                price,
                payment,
                payment_reference: paymentPayload.external_reference,
                shipping_time: shippingDate,
                shipping_type: shippingType,
            }
        })

        res.clearCookie("cart")

        res.status(201).json({ msg: "Pedido feito com sucesso", order })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = createOrderController
