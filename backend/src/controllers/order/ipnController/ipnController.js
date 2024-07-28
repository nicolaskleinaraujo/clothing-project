const MercadoPago = require("mercadopago").MercadoPagoConfig
const Payment = require("mercadopago").Payment

const client = new MercadoPago({
    accessToken: process.env.MERCADO_PAGO_TOKEN,
})
const payment = new Payment(client)

const ipnController = async(req, res) => {
    const topic = req.query.topic
    const id = req.query.id

    if (topic === 'payment') {
        payment.get({ id }).then((payment) => console.log(payment))
    }

    res.status(200)
}

module.exports = ipnController
