const MercadoPago = require("mercadopago").MercadoPagoConfig
const Payment = require("mercadopago").Payment

const client = new MercadoPago({
    accessToken: process.env.MERCADO_PAGO_TOKEN,
})
const payment = new Payment(client)

const ipnController = async(req, res) => {
    var topic = req.query.topic
    var id = req.query.id

    try {
        if (topic === 'payment') {
            const userPayment = await payment.get({ id })
            console.log(userPayment)
            console.log(userPayment.status)
        }

        res.sendStatus(200)
        res.status(200)
    } catch (error) {
        res.status(500)
    }
}

module.exports = ipnController
