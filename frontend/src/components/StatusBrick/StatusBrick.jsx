// CSS
import styles from "./StatusBrick.module.css"

// Modules
import { StatusScreen, initMercadoPago } from '@mercadopago/sdk-react'
import { toast } from "react-toastify"

const StatusBrick = ({ paymentId }) => {
    initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY)

    const initialization = {
        paymentId,
    }

    const onError = () => {
        toast.error("Erro ao carregar status")
    }

    return (
        <div className={styles.status_brick}>
            <StatusScreen
                initialization={initialization}
                onError={onError}
            />
        </div>
    )
}

export default StatusBrick
