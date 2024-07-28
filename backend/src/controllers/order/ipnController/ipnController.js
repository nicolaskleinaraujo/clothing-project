const MercadoPago = require("mercadopago").MercadoPagoConfig
const Payment = require("mercadopago").Payment

const client = new MercadoPago({
    accessToken: process.env.MERCADO_PAGO_TOKEN,
})
const payment = new Payment(client)

const ipnController = async(req, res) => {
    var topic = req.query.topic
    var id = req.query.id

    if (topic === 'payment') {
        const userPayment = payment.get({ id })
        console.log(userPayment)
    }

    res.sendStatus(200)
}

module.exports = ipnController
