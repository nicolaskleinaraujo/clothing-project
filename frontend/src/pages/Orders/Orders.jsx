// CSS
import styles from "./Orders.module.css"

// Modules
import dbFetch from "../../config/axios"
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

const Orders = () => {
    const { id } = useParams()
    const { userId } = useContext(UserContext)

    const [orders, setOrders] = useState([])

    const getOrder = async() => {
        try {
            const res = dbFetch.post("/orders/user", {
                "id": id,
                "userId": userId,
            })
    
            console.log(res)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        getOrder()
    }, [])

    return (
        <div>Orders</div>
    )
}

export default Orders
