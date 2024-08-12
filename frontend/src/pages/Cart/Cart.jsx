// CSS
import styles from "./Cart.module.css"

// dbFetch
import dbFetch from "../../config/axios"

// Modules
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { LoadingContext } from "../../context/LoadingContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { MdOutlineRemoveShoppingCart } from "react-icons/md"
import Loading from "../../components/Loading/Loading"

const Cart = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)

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

            setLoading(false)
        } catch (error) {
            if (error.response.data.msg === "Informações insuficientes") {
                toast.info("Adicione produtos no seu carrinho")
                navigate("/")
                return
            }
        }
    }

    const removeItem = async(id) => {
        try {
            await dbFetch.delete("/cart", {
                data: {
                    "id": id,
                    "userId": userId,
                }
            })

            setLoading(true)
            calculatePrice()
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        setLoading(true)
        calculatePrice()
    }, [])

    return (
        <div className={styles.cart}>
            { loading ? (
                <Loading />
            ) : (
                <>
                    <h1>Seu carrinho</h1>

                    <div className={styles.cart_products}>
                        { products &&
                            products.map(product => (
                                <div key={product.id}>
                                    <img src={`${import.meta.env.VITE_API_URL}/images/${product.image}`} alt="Foto do Produto" />
                                    <div>
                                        <p style={{ marginBottom: ".5em" }}>{product.name}</p>
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

                    <h2>Você possui algum cupom?</h2>
                    <div className={styles.cart_coupon}>
                        <input
                            type="text"
                            name="coupon"
                            id="coupon"
                            onChange={(e) => setCoupon(e.target.value)}
                            value={coupon}
                            placeholder="Digite o cupom"
                        />
                        <button onClick={() => calculatePrice()}>Testar Cupom</button>
                    </div>

                    {/* TODO hotfix the create order stages */}
                    <button onClick={() => navigate("/create-order")}>Continuar compra</button>
                </>
            )}
        </div>
    )
}

export default Cart