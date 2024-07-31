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
        <div className={styles.cart}>
            <h1>Seu carrinho</h1>

            <div className={styles.cart_products}>
                { products &&
                    products.map(product => (
                        <div key={product.id}>
                            <img src={`${import.meta.env.VITE_API_URL}/images/${product.image}`} alt="Foto do Produto" />
                            <div>
                                <p>{product.name}</p>
                                <p>{product.sizes[0].size} | {product.colors[0]}</p>
                            </div>
                            <button onClick={() => removeItem(product.id)}><MdOutlineRemoveShoppingCart /></button>
                            <p>R${product.price}</p>
                        </div>
                    ))
                }
            </div>

            { orderPrice != 0 &&
                <div className={styles.cart_infos}>
                    <p>Produtos: R${productPrice}</p>
                    <p>Envio: R${shippingPrice}</p>
                    { discount != undefined && <p>Disconto: R${discount}</p> }
                    <p>Preço total: R${orderPrice}</p>
                    <p>Prazo de entrega: até {shippingDate} dias</p>
                </div>
            }

            <button onClick={() => console.log("concluido")}>Concluir compra</button>
        </div>
    )
}

export default Cart