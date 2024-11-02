const MercadoPago = require("mercadopago").MercadoPagoConfig
const Payment = require("mercadopago").Payment
const dayjs = require("dayjs")

const client = new MercadoPago({
    accessToken: process.env.MERCADO_PAGO_TOKEN,
})

const createPix = async(payload) => {
    const date_of_expiration = dayjs().add(10, "minute").toISOString()

    const body = {
        "installments": 1,

        "payer": {
            entity_type: "individual",
            type: "customer",
            email: payload.userEmail,
        },

        "date_of_expiration": date_of_expiration,

        "payment_method_id": "pix",
        "token": "teste",
        "transaction_amount": payload.price, 

        "notification_url": `${process.env.API_URL}/orders/ipn`,
    }

    try {
        const payments = new Payment(client)

        const payment = await payments.create({ body })

        const pix = payment.point_of_interaction.transaction_data.ticket_url
        const paymentId = payment.id

        return { pix, paymentId }
    } catch (error) {
        console.log(error)
    }
}

module.exports = createPix
