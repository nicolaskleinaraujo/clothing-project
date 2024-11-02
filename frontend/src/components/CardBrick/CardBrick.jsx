// CSS
import styles from "./CardBrick.module.css"

// Modules
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react'
import { toast } from "react-toastify"


const CardBrick = ({ amount }) => {
    initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY)

    const onSubmit = async(formData) => {
        console.log(formData)
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
