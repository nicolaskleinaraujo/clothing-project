// CSS
import styles from "./Cart.module.css"

// dbFetch
import dbFetch from "../../config/axios"

// Modules
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Cart = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)

    const [products, setProducts] = useState([])
    const [productPrice, setProductPrice] = useState(0)
    const [shippingPrice, setShippingPrice] = useState(0)
    const [orderPrice, setOrderPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [shippingDate, setShippingDate] = useState(0)

    const [coupon, setCoupon] = useState("")

    const calculatePrice = async() => {
        try {
            const res = await dbFetch.post("/cart/calculate", {
                "coupon": coupon !== "" ? coupon : "",
                "userId": userId,
            })

            setProducts(res.data.orderProducts)
            setProductPrice(res.data.allPrices.productPrice)
            setShippingPrice(res.data.allPrices.shippingPrice)
            setOrderPrice(res.data.allPrices.orderPrice)
            setDiscount(res.data.allPrices.discount)
            setShippingDate(res.data.shippingDate)

            toast.success(res.data.msg)
        } catch (error) {
            if (error.response.status === 401) {
                toast.info("Faça seu login")
                navigate("/login")
                return
            }

            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        calculatePrice()
    }, [])

    return (
        <div>
            <h1>Seu carrinho</h1>
        </div>
    )
}

export default Cart