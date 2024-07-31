// CSS
import styles from "./Cart.module.css"

// dbFetch
import dbFetch from "../../config/axios"

// Modules
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { MdOutlineRemoveShoppingCart, MdTurnRight } from "react-icons/md"

const Cart = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)
    const [loading, setLoading] = useState(true)

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
                "coupon": coupon,
                "userId": userId,
            })

            setProducts(res.data.orderProducts)
            setProductPrice(res.data.allPrices.productPrice)
            setShippingPrice(res.data.allPrices.shippingPrice)
            setOrderPrice(res.data.allPrices.orderPrice)
            setDiscount(res.data.allPrices.discount)
            setShippingDate(res.data.shippingDate)

            toast.success(res.data.msg)
            setLoading(false)
        } catch (error) {
            if (error.response.status === 401) {
                toast.info("Faça seu login")
                navigate("/login")
                return
            }

            toast.error(error.response.data.msg)
        }
    }

    const removeItem = async(id) => {
        try {
            const res = await dbFetch.delete("/cart", {
                data: {
                    "id": id,
                    "userId": userId,
                }
            })

            toast.success(res.data.msg)
            setLoading(true)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        calculatePrice()
    }, [loading === true])

    return (
        <div>
            <h1>Seu carrinho</h1>

            <div>
                { products &&
                    products.map(product => (
                        <div key={product.id}>
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                            <button onClick={() => removeItem(product.id)}><MdOutlineRemoveShoppingCart /></button>
                        </div>
                    ))
                }
            </div>

            { orderPrice &&
                <div>
                    <p>Produtos: {productPrice}</p>
                    <p>Envio: {shippingPrice}</p>
                    { discount != undefined && <p>Disconto: {discount}</p> }
                    <p>Preço total: {orderPrice}</p>
                    <p>Chega em {shippingDate} dias</p>
                </div>
            }
        </div>
    )
}

export default Cart