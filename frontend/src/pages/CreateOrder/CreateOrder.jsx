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


    const getOrderInfos = async() => {
        try {
            const res = await dbFetch.post("/address/user", {
                "id": userId,
                "userId": userId,
            })
            setUserAddress(res.data.address)
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
                    <h2>Endereço</h2>
                    <p>{userAddress.city}, {userAddress.district}, {userAddress.street}, {userAddress.houseNum}</p>

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
                        <button>Adicionar Cupom</button>
                    </div>

                    <h2>Entrega</h2>
                    <select name="delivery" id="delivery">
                        <option value="">PAC</option>
                        <option value="">Sedex</option>
                    </select>

                    <h2>Itens</h2>
                    <p>...</p>

                    <h2>Resumo da Compra</h2>
                    <p>Subtotal: </p>
                    <p>Frete: </p>
                    <p>Disconto: </p>
                    <p>Total: </p>
                    <p>Prazo de entrega: até ... dias</p>

                    <button>Finalizar compra</button>
                </>
            )}
        </div>
    )
}

export default CreateOrder
