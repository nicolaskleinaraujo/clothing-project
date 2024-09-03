// CSS
import styles from "./CreateCoupon.module.css"

// Modules
import dbFetch from "../../../config/axios"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { UserContext } from "../../../context/UserContext"
import { LoadingContext } from "../../../context/LoadingContext"
import Loading from "../../../components/Loading/Loading"

const CreateCoupon = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)

    const [code, setCode] = useState("")
    const [percentage, setPercentage] = useState(true)
    const [quantity, setQuantity] = useState(0)
    const [minimum, setMinimum] = useState(0)

    const createCoupon = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await dbFetch.post("/coupons", {
                code,
                percentage,
                quantity: parseFloat(quantity),
                minimum: parseFloat(minimum),
                userId,
            })

            navigate("/admin/coupons")
        } catch (error) {
            toast.error("Erro, tente novamente")
            setLoading(false)
        }
    }

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <form onSubmit={createCoupon}>
                    <h1>Criar cupom</h1>

                    <label>
                        <p>Código</p>
                        <input type="text" onChange={(e) => setCode(e.target.value)} value={code} />
                    </label>

                    <div>
                        <label>
                            <input
                                type="radio"
                                name="percentage"
                                id="percentage"
                                value={true}
                                onChange={(e) => setPercentage(e.target.value)}
                            />

                            <p>{"%"}</p>
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="percentage"
                                id="percentage"
                                value={false}
                                onChange={(e) => setPercentage(e.target.value)}
                            />

                            <p>{"R$"}</p>
                        </label>
                    </div>

                    <label>
                        <p>Quantidade {percentage ? "%" : "R$"}</p>
                        <input type="number" min={0} onChange={(e) => setQuantity(e.target.value)} value={quantity} />
                    </label>

                    <label>
                        <p>Pedido Minimo R$</p>
                        <input type="number" min={0} onChange={(e) => setMinimum(e.target.value)} value={minimum} />
                    </label>

                    <input type="submit" value="Criar" />
                </form>
            )}
        </div>
    )
}

export default CreateCoupon
