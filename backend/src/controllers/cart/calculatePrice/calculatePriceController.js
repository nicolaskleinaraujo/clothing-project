const prisma = require("../../../db/client")
const calculateShipping = require("../../../config/shipping")

const calculatePriceController = async(req, res) => {
    const cart = req.signedCookies.cart
    const { userId, coupon, addressIndex, delivery } = req.body

    if (!cart || cart.length === 0) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    let productPrice = 0
    let orderProducts = []
    for (let index = 0; index < cart.length; index++) {
        const id = cart[index].productId

        const product = await prisma.products.findUnique({ 
            where: { id }, 
            include: { 
                sizes: true,
                Images: { orderBy: { id: "asc" } }
            },
        })

        if (!product) {
            res.clearCookie("cart")
            res.status(400).json({ msg: "Pedido invalido" })
            return
        }

        if (!product.avaiable) {
            res.clearCookie("cart")
            res.status(400).json({ msg: "Pedido invalido" })
            return
        }

        if (product.quantity < cart[index].quantity) {
            res.clearCookie("cart")
            res.status(400).json({ msg: "Pedido invalido" })
            return
        }

        const sizeAvaiable = product.sizes.some(size => size.id === cart[index].sizeId)
        if (!sizeAvaiable) {
            res.clearCookie("cart")
            res.status(400).json({ msg: "Pedido invalido" })
            return
        }

        if (!product.colors.includes(cart[index].color)) {
            res.clearCookie("cart")
            res.status(400).json({ msg: "Pedido invalido" })
            return
        }

        // Converting images into base64
        product.Images[0].content = product.Images[0].content.toString("base64")

        // Adds the product to order products
        product.sizes = product.sizes.filter(size => size.id === cart[index].sizeId)
        product.colors = product.colors.split(", ").filter(color => color == cart[index].color)
        product.quantity = cart[index].quantity
        orderProducts.push(product)

        // Calculates the product price
        productPrice += parseFloat((product.price * cart[index].quantity).toFixed(2))
    }

    try {
        // Gets the user address to calculate the shipping
        let shippingOptions
        let selectedShipping
        let orderPrice = 0
    
        const user = await prisma.user.findUnique({ where: { id: parseInt(userId) }, include: { Address: true } })
        if (user.Address.length != 0) {
            const shipping = await calculateShipping(user.Address[addressIndex].cep)

            shippingOptions = shipping.map(service => ({
                name: service.name, price: service.price, time: service.delivery_time
            }))

            if (delivery !== "") {
                selectedShipping = shipping.filter(service => service.name === delivery)[0]
                orderPrice = parseFloat(selectedShipping.price)
            }
        }

        // Calculates the order price
        orderPrice += parseFloat(productPrice)

        // Calculates and aplies discount to order price
        let discount
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
                res.status(400).json({ msg: "Cupom já utilizado" })
                return
            }

            if (searchCoupon.minimum > orderPrice) {
                res.status(400).json({ msg: `Pedido minimo de R$${searchCoupon.minimum} não atingido` })
                return
            }

            if (searchCoupon.percentage) {
                discount = orderPrice * (searchCoupon.quantity / 100)
                orderPrice -= parseFloat(discount)
            } else if (!searchCoupon.percentage) {
                discount = orderPrice - searchCoupon.quantity
                orderPrice -= parseFloat(discount)
            }
        }

        // Payload all prices
        const allPrices = { productPrice, orderPrice: parseFloat(orderPrice.toFixed(2)), discount }
    
        res.status(200).json({ 
            msg: "Carrinho carregado com sucesso",
            allPrices,
            shippingOptions,
            selectedShipping,
            orderProducts,
        })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = calculatePriceController
