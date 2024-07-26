const prisma = require("../../../db/client")
const calculateShipping = require("../../../config/shipping")

const calculatePriceController = async(req, res) => {
    const cart = req.signedCookies.cart
    const { userId, coupon } = req.body

    if (!cart || cart.length === 0) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    let productPrice = 0
    let orderProducts = []
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

        // Adds the product to order products
        product.sizes = product.sizes.filter(size => size.id === cart[index].sizeId)
        orderProducts.push(product)

        // Calculates the product price
        productPrice += product.price
    }

    try {
        // Gets the user address to calculate the shipping
        let shippingPrice = 0
        let shippingDate = 0
    
        const user = await prisma.user.findUnique({ where: { id: parseInt(userId) }, include: { Address: true } })
        if (user.Address.length != 0) {
            const shipping = await calculateShipping(user.Address[0].cep)
            shippingPrice = parseInt(shipping.price)
            shippingDate = parseInt(shipping.delivery_time)
        }

        // Calculates the order price
        let orderPrice = productPrice + shippingPrice

        // Calculates and aplies discount to order price
        let discount
        if (coupon) {
            const searchCoupon = await prisma.coupon.findUnique({
                where: { code: coupon },
                include: { users: true }, 
            })

            if (!searchCoupon) {
                res.status(404).json({ msg: "Codigo de cupom incorreto" })
                return
            }

            const alreadyUsed = searchCoupon.users.find(userCoupon => userCoupon.id === userId)
            if (!alreadyUsed) {
                if (searchCoupon.minimum < orderPrice) {
                    if (searchCoupon.percentage) {
                        discount = orderPrice * (searchCoupon.quantity / 100)
                        orderPrice -= parseFloat(discount)
                    } else if (!searchCoupon.percentage) {
                        discount = orderPrice - searchCoupon.quantity
                        orderPrice -= parseFloat(discount)
                    }
                } else if (searchCoupon.minimum > orderPrice) {
                    discount = `Pedido minimo de R$${searchCoupon.minimum}`
                }
            } else if (alreadyUsed) {
                discount = "Cupom já foi utilizado"
            }
        }

        // Payload all prices
        const allPrices = { productPrice, shippingPrice, orderPrice, discount }        
    
        res.status(200).json({ 
            msg: "Carrinho carregado com sucesso", 
            allPrices,
            shippingDate, 
            orderProducts,
        })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = calculatePriceController
