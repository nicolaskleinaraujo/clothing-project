const { MercadoPagoConfig, Payment } = require("mercadopago")
const prisma = require("../../../db/client")

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_TOKEN,
})
const payment = new Payment(client)

const ipnController = (req, res) => {
    const topic = req.query.type
    const id = req.query["data.id"]

    setTimeout(async () => {
        if (topic === "payment") {
            try {
                const result = await payment.get({ id })

                if (result.status === "approved") {
                    await prisma.orders.update({
                        where: { payment_reference: result.external_reference },
                        data: { paid: true }
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }, 20000)

    res.sendStatus(200)
}

module.exports = ipnController
