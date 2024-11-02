const prisma = require("../../../db/client")
const processPayment = require("../../../config/processPayment")

const cardPayment = async(req, res) => {
    const id = req.body.orderId

    try {
        const process = await processPayment(req.body.formData)
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = cardPayment
