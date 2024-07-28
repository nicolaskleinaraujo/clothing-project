const mercadopago = require("mercadopago")

const ipnController = async(req, res) => {
    var topic = req.query.topic
    var id = req.query.id

    if (topic === 'payment') {
        mercadopago.payment.findById(id).then(function(payment) {
            console.log(payment)
        });
    }

    res.sendStatus(200)
}

module.exports = ipnController
