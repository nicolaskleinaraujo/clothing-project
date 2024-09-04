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
    const [received, setReceived] = useState(false)

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

    useEffect(() => {
        getAllOrders()
    }, [])

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <>
                    {orders.map(order => (
                        <div>
                            {order.price}
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default AllOrders
