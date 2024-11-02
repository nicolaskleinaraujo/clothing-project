// CSS
import styles from "./Order.module.css"

// Components
import CardBrick from "../../components/CardBrick/CardBrick"

// Modules
import dbFetch from "../../config/axios"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import timezone from "dayjs/plugin/timezone"
import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { LoadingContext } from "../../context/LoadingContext"
import { toast } from "react-toastify"
import Loading from "../../components/Loading/Loading"

// DayJS Configs
dayjs.extend(utc)
dayjs.extend(timezone)

const Order = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)

    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    const [products, setProducts] = useState([])
    const [orderPrice, setOrderPrice] = useState(0)
    const [paid, setPaid] = useState(false)
    const [paymentUrl, setPaymentUrl] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
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
            setPaymentMethod(res.data.order.payment_method)
            setReceived(res.data.order.received)
            setShippingTime(res.data.order.shipping_time)
            setTrackingCode(res.data.order.tracking_code)

            // Calculates and sets payment expiration
            const expiresIn = dayjs.utc(res.data.order.created_at).add(10, "minute").tz("America/Sao_Paulo")
            setHours(String(expiresIn.hour()).padStart(2, '0'))
            setMinutes(String(expiresIn.minute()).padStart(2, '0'))

            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.msg)
            navigate("/")
        }
    }

    useEffect(() => {
        setLoading(true)
        getOrder()
    }, [])

    return (
        <div className={styles.order}>
            { loading ? (
                <Loading />
            ) : (
                <>
                    { !paid && <p>Você tem até as {hours}:{minutes} de hoje para efetuar o pagamento abaixo</p> }

                    { !paid && paymentMethod === "PIX" ? (
                        <iframe src={paymentUrl}></iframe> 
                    ) : (
                        <CardBrick amount={100} />
                    )}

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
                                    <img src={`data:image/png;base64,${product.product.Images[0].content}`} alt="Foto Produto" />
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
                </>
            )}
        </div>
    )
}

export default Order