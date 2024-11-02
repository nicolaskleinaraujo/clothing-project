// CSS
import styles from "./CardBrick.module.css"

// Modules
import dbFetch from "../../config/axios"
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react'
import { toast } from "react-toastify"

const CardBrick = ({ amount, orderId, getOrder }) => {
    initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY)

    const onSubmit = async(formData) => {
        try { 
            const res = await dbFetch.post("/orders/card", { formData, orderId })
            toast.success(res.data.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        }

        getOrder()
    }

    const onError = () => {
        toast.error("Erro ao carregar pagamento")
    }

    return (
        <div className={styles.CardBrick}>
            <CardPayment
                initialization={{ amount }}
                onSubmit={onSubmit}
                onError={onError}
            />
        </div>
    )
}

export default CardBrick
