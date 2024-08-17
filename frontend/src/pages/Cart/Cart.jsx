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

    const calculatePrice = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.post("/cart/calculate", {
                "coupon": "",
                "delivery": "",
                "userId": userId,
            })

            setProducts(res.data.orderProducts)
            setProductPrice(res.data.allPrices.productPrice)

            setLoading(false)
        } catch (error) {
            // TODO add redirect context
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

                    { productPrice != 0 &&
                        <div className={styles.cart_infos}>
                            <p>Total: R${productPrice}</p>
                        </div>
                    }

                    <button onClick={() => navigate("/create-order")}>Continuar compra</button>
                </>
            )}
        </div>
    )
}

export default Cart