// CSS
import styles from "./Orders.module.css"

// Modules
import dbFetch from "../../config/axios"
import dayjs from "dayjs"
import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { LoadingContext } from "../../context/LoadingContext"
import Loading from "../../components/Loading/Loading"

const Orders = () => {
    const { id } = useParams()
    const { userId } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)

    const [orders, setOrders] = useState([])
    const [data, setData] = useState("")

    const getOrders = async() => {
        try {
            const res = await dbFetch.post("/orders/user", {
                "id": id,
                "userId": userId,
            })

            const data = dayjs(res.data.orders.created_at)
            const day = data.date().toString().padStart(2, '0')
            const month = (data.month() + 1).toString().padStart(2, '0')
            const year = data.year().toString()
            setData(`${day}/${month}/${year}`)

            setOrders(res.data.orders)

            setLoading(false)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        setLoading(true)
        getOrders()
    }, [])

    return (
        <div className={styles.orders}>
            { loading ? (
                <Loading />
            ) : (
                <>
                    <div className={styles.orders_products}>
                        { orders.length === 0 ? (
                            <p>Seus pedidos aparecerão aqui</p>
                        ) : (
                            orders.map(order => (
                                <Link to={`/order/${order.id}`} key={order.id}>
                                    <div>
                                        <img src={`${import.meta.env.VITE_API_URL}/images/${order.orderProducts[0].product.image}`} alt="Foto do Produto" />
                                        <p>Realizado em {data}</p>
                                        <div>
                                            <p>{order.paid ? order.received ? "Entregue" : "Pago" : "Aguardando Pagamento"}</p>
                                            <p>R${order.price}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default Orders
