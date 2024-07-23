const prisma = require("../../../db/client")

const calculatePriceController = async(req, res) => {
    const cart = req.signedCookies.cart

    if (!cart) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    let price = 0
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
        price += product.price
    }
}

module.exports = calculatePriceController
