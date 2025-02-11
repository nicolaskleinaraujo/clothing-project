import { MercadoPagoConfig, Payment } from "mercadopago"
import { PaymentCreateRequest } from "mercadopago/dist/clients/payment/create/types"

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_TOKEN as string,
})
const payment = new Payment(client)

const createPayment = async(payload: PaymentCreateRequest) => {
  try {
    return await payment.create({ body: payload })
  } catch (error) {
    throw error
  }
}

export default createPayment
