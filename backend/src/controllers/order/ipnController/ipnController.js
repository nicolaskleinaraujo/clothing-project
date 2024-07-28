const Payment = require("mercadopago").Payment
const payment = new Payment()

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
