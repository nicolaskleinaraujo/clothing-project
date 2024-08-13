const prisma = require("../../../db/client")
const calculateShipping = require("../../../config/shipping")

const deliveryController = async(req, res) => {
    const id = req.body.id

    if (isNaN(id)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        const address = await prisma.address.findFirst({ where: { userId: parseInt(id) } })

        if (!address) {
            res.status(404).json({ msg: "Endereço não encontrado" })
            return
        }

        const shipping = await calculateShipping(address.cep)

        const shippingDetails = shipping.map(service => ({
            name: service.name, price: service.price, time: service.delivery_time
        }))

        res.status(200).json({ msg: "Informações carregadas com sucesso", shippingDetails })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = deliveryController
