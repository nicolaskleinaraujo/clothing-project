// CSS
import styles from "./Order.module.css"

// Modules
import dbFetch from "../../config/axios"
import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

const Order = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)

    const [products, setProducts] = useState([])
    const [orderPrice, setOrderPrice] = useState(0)
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

            console.log(res.data.order.orderProducts)
            setProducts(res.data.order.orderProducts)
            setOrderPrice(res.data.order.price)
            setPaymentUrl(res.data.order.payment)
            setReceived(res.data.order.received)
            setShippingTime(res.data.order.shipping_time)
            setTrackingCode(res.data.order.tracking_code)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrder()
    }, [])

    return (
        <div className={styles.order}>
            <h1>Seu Pedido</h1>

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