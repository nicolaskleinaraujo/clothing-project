const MercadoPago = require("mercadopago").MercadoPagoConfig
const Preference = require("mercadopago").Preference
const dayjs = require("dayjs")

const client = new MercadoPago({
  accessToken: process.env.MERCADO_PAGO_TOKEN,
})
const preference = new Preference(client)

const createPayment = async(payload) => {
  const expiration_date_from = dayjs().toISOString()
  const expiration_date_to = dayjs().add(10, "minute").toISOString()

  const body = {
    "items": [{
      "id": 1,
      "title": "Produtos",
      "quantity": 1,
      "currency_id": "BRL",
      "unit_price": payload.price
    }],

    "back_urls": {
      "success": "https://www.youtube.com/",
      "failure": "https://www.google.com/",
      "pending": "https://www.github.com/",
    },

    "auto_return": "all",

    "payer": {
      "email": payload.userEmail,
      "name": payload.userName
    },

    "expires": true,
    "expiration_date_from": expiration_date_from,
    "expiration_date_to": expiration_date_to,

    "notification_url": `${process.env.API_URL}/orders/ipn`,
  }

  try {
    const payment = await preference.create({ body })
    return payment.init_point
  } catch (error) {
    console.log(error)
  }
}

module.exports = createPayment
