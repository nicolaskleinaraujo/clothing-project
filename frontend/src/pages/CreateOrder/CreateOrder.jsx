// CSS
import styles from "./CreateOrder.module.css"

// Modules
import dbFetch from "../../config/axios"
import Loading from "../../components/Loading/Loading"
import { toast } from "react-toastify"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { LoadingContext } from "../../context/LoadingContext"

const CreateOrder = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)

    const [userAddress, setUserAddress] = useState({})
    const [coupon, setCoupon] = useState("")

    const [products, setProducts] = useState([])
    const [productPrice, setProductPrice] = useState(0)
    const [orderPrice, setOrderPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [shippingDetails, setShippingDetails] = useState([])

    const [delivery, setDelivery] = useState("")

    const getOrderInfos = async() => {
        try {
            const addressRes = await dbFetch.post("/address/user", {
                "id": userId,
                "userId": userId,
            })

            setUserAddress(addressRes.data.address)

            const orderRes = await dbFetch.post("/cart/calculate", {
                "coupon": coupon,
                "userId": userId,
            })

            setProducts(orderRes.data.orderProducts)
            setProductPrice(orderRes.data.allPrices.productPrice)
            setOrderPrice(orderRes.data.allPrices.orderPrice)
            setDiscount(orderRes.data.allPrices.discount)
            setShippingDetails(orderRes.data.shippingDetails)

            setLoading(false)
        } catch (error) {
            if (error.response.data.msg === "Endereço não encontrado") {
                toast.info("Cadastre seu endereço")
                navigate("/address")
            }
        }
    }

    useEffect(() => {
        setLoading(true)
        getOrderInfos()
    }, [])

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <>
                    {/* TODO add change address button and redirect */}
                    <h2>Endereço</h2>
                    <p>{userAddress.city}, {userAddress.district}, {userAddress.street}, {userAddress.houseNum}</p>

                    {/* TODO add option details */}
                    <h2>Entrega</h2>
                    <select name="delivery" id="delivery" className={styles.create_order_delivery} onChange={(e) => setDelivery(e.target.value)}>
                        { shippingDetails &&
                            shippingDetails.map(service => (
                                <option value={service.name}>{service.name} - {service.time} dia(s) - RS{service.price}</option>
                            ))
                        }
                    </select>

                    <h2>Cupom</h2>
                    <div>
                        <input
                            type="text"
                            name="coupon"
                            id="coupon"
                            placeholder="Digite o cupom" 
                            value={coupon} 
                            onChange={(e) => setCoupon(e.target.value)} 
                        />
                        <button>Testar Cupom</button>
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
                    <p>Frete: R${}</p>
                    { discount != undefined && <p>Disconto: { discount != "Cupom já foi utilizado" ? `R$${discount}` : "Cupom já utilizado" }</p> }
                    <p>Total: R${orderPrice}</p>

                    {/* TODO create the create order function */}
                    <button>Finalizar compra</button>
                </>
            )}
        </div>
    )
}

export default CreateOrder
