const prisma = require("../../../db/client")
const processPayment = require("../../../config/processPayment")

const cardPayment = async(req, res) => {
    const id = req.body.orderId

    try {
        const process = await processPayment(req.body.formData)

        if (process.status === "rejected") {
            res.status(400).json({ msg: "Pagamento rejeitado, tente novamente" })
            return
        }

        const order = await prisma.orders.update({
            where: { id: parseInt(id) },
            data: { paid: true },
        })

        res.status(200).json({ msg: "Pagamento efetuado com sucesso", order })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = cardPayment