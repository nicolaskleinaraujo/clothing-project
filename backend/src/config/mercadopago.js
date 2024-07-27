const MercadoPago = require("mercadopago").MercadoPagoConfig
const Preference = require("mercadopago").Preference

const client = new MercadoPago({
  accessToken: process.env.MERCADO_PAGO_TOKEN,
})
const preference = new Preference(client)

const createPayment = async(payload) => {
  const body = {
    "items": payload.products.map((product, index) => ({
      "id": index + 1,
      "title": product.name,
      "quantity": 1,
      "currency_id": "BRL",
      "unit_price": product.price
    })),

    "back_urls": {
      "success": "https://www.youtube.com/",
      "failure": "https://www.google.com/",
      "pending": "https://www.github.com/",
    },

    "auto_return": "all",

    "payer": {
      "email": payload.userEmail,
      "name": payload.userName
    }
  }

  try {
    const payment = await preference.create({ body })
    return payment.init_point
  } catch (error) {
    console.log(error)
  }
}

module.exports = createPayment
