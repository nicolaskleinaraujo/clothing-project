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
import { RedirectContext } from "../../context/RedirectContext"

const Cart = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)

    const { redirect, setRedirect } = useContext(RedirectContext)
    const [getRedirect, setGetRedirect] = useState("")

    const [products, setProducts] = useState([])
    const [productPrice, setProductPrice] = useState(0)

    const saveRedirect = () => {
        if (redirect !== "") {
            setGetRedirect(redirect)
            setRedirect("")
        }
    }

    const calculatePrice = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.post("/cart/calculate", {
                "coupon": "",
                "addressIndex": 0,
                "delivery": "",
                "userId": userId,
            })

            setProducts(res.data.orderProducts)
            setProductPrice(res.data.allPrices.productPrice)

            setLoading(false)
        } catch (error) {
            if (error.response.data.msg === "Informações insuficientes") {
                toast.info("Adicione produtos no seu carrinho")
            } else {
                toast.error(error.response.data.msg)
            }

            if (getRedirect !== "") {
                return navigate(getRedirect)
            }

            return navigate("/")
        }
    }

    const removeItem = async(index) => {
        try {
            setLoading(true)

            await dbFetch.delete("/cart", {
                data: {
                    "index": index,
                    "userId": userId,
                }
            })

            calculatePrice()
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    useEffect(() => {
        saveRedirect()
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
                            products.map((product, index) => (
                                <div key={product.id}>
                                    <img src={`data:image/png;base64,${product.Images[0].content}`} alt="Foto Produto" />
                                    <div>
                                        <p style={{ marginBottom: ".5em" }}>{product.quantity}x {product.name}</p>
                                        <p>{product.sizes[0].size} | {product.colors[0]}</p>
                                    </div>
                                    <button onClick={() => removeItem(index)}><MdOutlineRemoveShoppingCart /></button>
                                    <p>R${product.price}</p>
                                </div>
                            ))
                        }
                    </div>

                    { productPrice != 0 &&
                        <div className={styles.cart_infos}>
                            <p>Total: R${productPrice.toFixed(2)}</p>
                        </div>
                    }

                    <button onClick={() => navigate("/create-order")}>Continuar compra</button>
                </>
            )}
        </div>
    )
}

export default Cart