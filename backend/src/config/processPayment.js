const { MercadoPagoConfig, Payment } = require("mercadopago")

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_TOKEN,
})
const payment = new Payment(client)

const createPayment = async(payload) => {
  try {
    return await payment.create({ body: payload })
  } catch (error) {
    console.log(error)
  }
}

module.exports = createPayment
