const prisma = require("../../../db/client")
const processPayment = require("../../../config/processPayment")

const cardPayment = async(req, res) => {
    const id = req.body.orderId

    try {
        const orderExists = await prisma.orders.findUnique({ where: { id } })
        if (!orderExists) {
            res.status(404).json({ msg: "Pedido não encontrado" })
            return
        }

        const process = await processPayment(req.body.formData)

        if (process.status === "rejected") {
            res.status(400).json({ msg: "Pagamento rejeitado, tente novamente" })
            return
        }

        const order = await prisma.orders.update({
            where: { id: parseInt(id) },
            data: {
                paid: true,
                payment_reference: String(process.id),
            },
        })

        res.status(200).json({ msg: "Pagamento efetuado com sucesso", order })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = cardPayment
