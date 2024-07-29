const MercadoPago = require("mercadopago").MercadoPagoConfig
const Payment = require("mercadopago").Payment

const client = new MercadoPago({
    accessToken: process.env.MERCADO_PAGO_TOKEN,
})
const payment = new Payment(client)

const ipnController = async(req, res) => {
    const topic = req.query.type
    const id = req.query["data.id"]

    setTimeout(() => {
        if (topic === "payment") {
            payment.get({ id }).then((result) => {
                console.log("RESULTADO")
                console.log(result.status)
                console.log(result.external_reference)
            }).catch((error) => {
                console.log("ERRO")
                console.log(error)
            })
        }
    }, 20000)

    res.sendStatus(200)
}

module.exports = ipnController
