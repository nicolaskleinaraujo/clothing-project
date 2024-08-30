// CSS
import styles from "./CreateOrder.module.css"

// Modules
import dbFetch from "../../config/axios"
import Loading from "../../components/Loading/Loading"
import { toast } from "react-toastify"
import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { LoadingContext } from "../../context/LoadingContext"
import { RedirectContext } from "../../context/RedirectContext"

const CreateOrder = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)
    const { setRedirect } = useContext(RedirectContext)

    const location = useLocation()
    const { addressIndex = 0 } = location.state || {}
    const [userAddress, setUserAddress] = useState({})

    const [products, setProducts] = useState([])
    const [productPrice, setProductPrice] = useState(0)
    const [orderPrice, setOrderPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [shippingOptions, setShippingOptions] = useState([])
    const [selectedShipping, setSelectedShipping] = useState(0)

    const [delivery, setDelivery] = useState("PAC")
    const [coupon, setCoupon] = useState("")

    const getUserAddress = async() => {
        setLoading(true)

        try {
            const addressRes = await dbFetch.post("/address/user", {
                "id": userId,
                "userId": userId,
            })

            if (!isNaN(addressIndex) && addressIndex <= 2 && addressIndex !== null) {
                setUserAddress(addressRes.data.address[addressIndex])
                return
            }

            setUserAddress(addressRes.data.address[0])
        } catch (error) {
            if (error.response.data.msg === "Endereço não encontrado") {
                setRedirect("/create-order")
                toast.info("Cadastre seu endereço")
                navigate("/address")
            }
        }
    }

    const getOrderInfos = async() => {
        if (!loading) { setLoading(true) }

        try {
            const orderRes = await dbFetch.post("/cart/calculate", {
                "coupon": coupon,
                "addressIndex": addressIndex,
                "delivery": delivery,
                "userId": userId,
            })

            setProducts(orderRes.data.orderProducts)
            setProductPrice(orderRes.data.allPrices.productPrice)
            setOrderPrice(orderRes.data.allPrices.orderPrice)
            setDiscount(orderRes.data.allPrices.discount)
            setShippingOptions(orderRes.data.shippingOptions)
            setSelectedShipping(orderRes.data.selectedShipping)

            setLoading(false)
        } catch (error) {
            if (error.response.data.msg === "Codigo de cupom incorreto") {
                toast.error("Código de cupom incorreto")
                setCoupon("")
                setLoading(false)
            }
        }
    }

    const createOrder = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.post("/orders", {
                "coupon": coupon,
                "addressIndex": addressIndex,
                "delivery": delivery,
                "userId": userId,
            })

            toast.success(res.data.msg)
            navigate(`/order/${res.data.order.id}`)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        getUserAddress()
    }, [])

    useEffect(() => {
        getOrderInfos()
    }, [delivery])

    return (
        <div className={styles.create_order}>
            { loading ? (
                <Loading />
            ) : (
                <>
                    <h2>Endereço</h2>
                    {/* FIXME fix the address rendering */}
                    <div className={styles.create_order.address}>
                        <p>{userAddress.name}</p>
                        <p>{userAddress.city}, {userAddress.houseNum}</p>
                        <p>{userAddress.complement} {userAddress.district}</p>
                        <p>{userAddress.city}, {userAddress.state} {userAddress.cep}</p>
                        <button onClick={() => { setRedirect("/create-order"), navigate("/address-menu") }}>Trocar endereço</button>
                    </div>

                    <h2>Entrega</h2>
                    <select name="delivery" id="delivery" value={delivery} className={styles.create_order_delivery} onChange={(e) => setDelivery(e.target.value)}>
                        { shippingOptions &&
                            shippingOptions.map((service, index) => (
                                <option key={index} value={service.name}>{service.name} - {service.time} dia(s) - RS{service.price}</option>
                            ))
                        }
                    </select>

                    <h2>Cupom</h2>
                    <div className={styles.create_order_coupon}>
                        <input
                            type="text"
                            name="coupon"
                            id="coupon"
                            placeholder="Digite o cupom" 
                            value={coupon} 
                            onChange={(e) => setCoupon(e.target.value)} 
                        />
                        <button onClick={() => getOrderInfos()}>Testar Cupom</button>
                    </div>

                    <h2>Itens</h2>
                    <div className={styles.create_order_products}>
                        { products &&
                            products.map(product => (
                                <div key={product.id}>
                                    <img src={`${import.meta.env.VITE_API_URL}/images/${product.image}`} alt="Foto do Produto" />
                                    <div>
                                        <p style={{ marginBottom: ".5em" }}>{product.name}</p>
                                        <p>{product.sizes[0].size} | {product.colors[0]}</p>
                                    </div>
                                    <p>R${product.price}</p>
                                </div>
                            ))
                        }
                    </div>

                    <h2>Resumo da Compra</h2>
                    <p>Subtotal: R${productPrice}</p>
                    <p>Frete: R${selectedShipping.price}</p>
                    { discount != undefined && <p>Disconto: { discount != "Cupom já foi utilizado" ? `R$${discount.toFixed(2)}` : "Cupom já utilizado" }</p> }
                    <p>Total: R${orderPrice}</p>

                    <button onClick={() => createOrder()}>Finalizar compra</button>
                </>
            )}
        </div>
    )
}

export default CreateOrder
