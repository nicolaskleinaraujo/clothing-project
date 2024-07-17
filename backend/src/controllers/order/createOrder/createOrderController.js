const prisma = require("../../../db/client")

const createOrderController = async (req, res) => {
    const { orderData } = req.body

    /*  [
            { productId: 1, sizeId: 1, quantity: 2 },
            { productId: 2, sizeId: 2, quantity: 1 },
            { productId: 3, sizeId: 3, quantity: 3 }
        ] */

    if (!orderData) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }
}

module.exports = createOrderController
