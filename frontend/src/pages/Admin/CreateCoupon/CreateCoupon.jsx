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
    const [minimum, setMinimum] = useState("R$ 0,00")

    const createCoupon = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await dbFetch.post("/coupons", {
                code,
                percentage,
                quantity: quantity,
                minimum: parseFloat(minimum),
                userId,
            })

            navigate("/admin/coupons")
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    const handleQuantityChange = (e) => {
        let input = e.target.value.replace(/\D/g, "")

        if (percentage) {
            const formatedInput = input.replace(/^0+/, "")

            if (formatedInput === "") {
                setQuantity(0)
                return
            }

            if (parseInt(formatedInput) > 100) {
                setQuantity(100)
                return
            }

            setQuantity(parseInt(formatedInput))
        } else if (!percentage) {
            const value = parseFloat(input) / 100

            const formatedValue = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                "currency": "BRL"
            }).format(value)
    
            setQuantity(parseFloat(formatedValue))
        }
    }

    const handleMinimumChange = (e) => {
        const input = e.target.value.replace(/\D/g, "")

        const value = parseFloat(input) / 100

        const formatedValue = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            "currency": "BRL"
        }).format(value)

        setMinimum(formatedValue)
    }

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <form onSubmit={createCoupon} className={styles.create_coupon}>
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
                                onChange={(e) => setPercentage(JSON.parse(e.target.value))}
                                defaultChecked={percentage ? true : false}
                            />

                            <p>{"%"}</p>
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="percentage"
                                id="percentage"
                                value={false}
                                onChange={(e) => setPercentage(JSON.parse(e.target.value))}
                                defaultChecked={percentage ? false : true}
                            />

                            <p>{"R$"}</p>
                        </label>
                    </div>

                    <label>
                        <p>Quantidade {percentage ? "%" : "R$"}</p>
                        <input type="text" onChange={(e) => handleQuantityChange(e)} value={quantity} />
                    </label>

                    <label>
                        <p>Pedido Minimo R$</p>
                        <input type="text" onChange={(e) => handleMinimumChange(e)} value={minimum} />
                    </label>

                    <input type="submit" value="Criar" />
                </form>
            )}
        </div>
    )
}

export default CreateCoupon
