// CSS
import styles from "./Order.module.css"

// Modules
import dbFetch from "../../config/axios"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

// DayJS Configs
dayjs.extend(utc);
dayjs.extend(advancedFormat);

const Order = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)

    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    const [products, setProducts] = useState([])
    const [orderPrice, setOrderPrice] = useState(0)
    const [paid, setPaid] = useState(false)
    const [paymentUrl, setPaymentUrl] = useState("")
    const [received, setReceived] = useState(false)
    const [shippingTime, setShippingTime] = useState(0)
    const [trackingCode, setTrackingCode] = useState("")

    const getOrder = async() => {
        try {
            const res = await dbFetch.post(`/orders/id`, {
                "id": id,
                "userId": userId,
            })

            setProducts(res.data.order.orderProducts)
            setOrderPrice(res.data.order.price)
            setPaid(res.data.order.paid)
            setPaymentUrl(res.data.order.payment)
            setReceived(res.data.order.received)
            setShippingTime(res.data.order.shipping_time)
            setTrackingCode(res.data.order.tracking_code)

            // Calculates and sets payment expiration
            const expiresIn = dayjs.utc(res.data.order.created_at).add(10, "minute")
            setHours(expiresIn.hour())
            setMinutes(expiresIn.minute())
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrder()
    }, [])

    return (
        <div className={styles.order}>
            { !paid && <p>Você tem até as {hours}:{minutes} de hoje para efetuar o pagamento</p> }
            { !paid && <iframe src={paymentUrl} loading="Carregando..."></iframe> }

            { orderPrice != 0 &&
                <div className={styles.order_infos}>
                    <p>Status: {
                        paid ? received ? "Entregue" : "Pago" : "Aguardando Pagamento"
                    }</p>
                    <p>Preço total: R${orderPrice}</p>
                    <p>Prazo de entrega: {shippingTime} dias</p>
                    {trackingCode && <p>Codigo rastreamento: {trackingCode}</p>}
                </div>
            }

            <h1>Resumo do Pedido</h1>
            <div className={styles.order_products}>
                { products &&
                    products.map(product => (
                        <div key={product.id}>
                            <img src={`${import.meta.env.VITE_API_URL}/images/${product.product.image}`} alt="Foto do Produto" />
                            <div>
                                <p>{product.quantity}x {product.product.name}</p>
                                <p>
                                    {product.product.sizes.find(size => size.id === product.sizeId).size} | {product.color}
                                </p>
                            </div>
                            <p>R${product.product.price}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Order