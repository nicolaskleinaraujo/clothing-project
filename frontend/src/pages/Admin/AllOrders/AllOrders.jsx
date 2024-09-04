// CSS
import styles from "./AllOrders.module.css"

// Modules
import dbFetch from "../../../config/axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoadingContext } from "../../../context/LoadingContext"
import { UserContext } from "../../../context/UserContext"
import { toast } from "react-toastify"
import Loading from "../../../components/Loading/Loading"

const AllOrders = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)

    const [paid, setPaid] = useState(false)
    const [received, setReceived] = useState(true)

    const [orders, setOrders] = useState([])

    const getAllOrders = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.post(`/orders/sort?paid=${paid}&received=${received}`, { userId })

            setOrders(res.data.orders)

            setLoading(false)
        } catch (error) {
            toast.error("Erro, tente novamente")
            navigate("/admin")
        }
    }

    const updateTrackingCode = async() => {
        console.log("updated")
    }

    const updateDelivered = async() => {
        console.log("updated")
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <div>
                    { orders.map(order => (
                        <div key={order.id}>
                            <p>{order.user.Address[0].name}</p>
                            <p>{order.user.Address[0].street}, {order.user.Address[0].houseNum}</p>
                            <p>{order.user.Address[0].complement} {order.user.Address[0].district}</p>
                            <p>{order.user.Address[0].city}, {order.user.Address[0].state} {order.user.Address[0].cep}</p>

                            { order.orderProducts.map(product => (
                                <div key={product.id}>
                                    <img src={`${import.meta.env.VITE_API_URL}/images/${product.product.image.split(", ")[0]}`} alt="Foto Produto" />
                                    <p>{product.product.name}</p>
                                    <p>{product.color} | {product.size.size}</p>
                                </div>
                            ))}

                            <div>
                                <button onClick={updateTrackingCode}>Adicionar Rastreio</button>
                                <button onClick={updateDelivered}>Mudar Recebido</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AllOrders
