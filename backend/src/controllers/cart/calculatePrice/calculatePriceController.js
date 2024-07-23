const prisma = require("../../../db/client")
const calculateShipping = require("../../../config/shipping")

const calculatePriceController = async(req, res) => {
    const cart = req.signedCookies.cart
    const userId = parseInt(req.body.userId)

    if (!cart) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    let productPrice = 0
    for (let index = 0; index < cart.length; index++) {
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

        // Calculates the order price
        productPrice += product.price
    }

    // Gets the user address to calculate the shipping
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { Address: true } })
    const shipping = await calculateShipping(user.Address[0].cep)
    const shippingPrice = parseInt(shipping.price)
    const shippingDate = shipping.delivery_time

    const orderPrice = productPrice + shippingPrice

    res.status(200).json({ msg: "Carrinho carregado com sucesso", productPrice, shippingPrice, orderPrice, shippingDate })
}

module.exports = calculatePriceController
