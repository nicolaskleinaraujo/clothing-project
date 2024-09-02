// CSS
import styles from "./Coupons.module.css"

// Modules
import dbFetch from "../../../config/axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { UserContext } from "../../../context/UserContext"
import { LoadingContext } from "../../../context/LoadingContext"
import Loading from "../../../components/Loading/Loading"

const Coupons = () => {
    const { userId } = useContext(UserContext)
    const navigate = useNavigate()
    const { loading, setLoading } = useContext(LoadingContext)

    const [coupons, setCoupons] = useState([])

    const getCoupons = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.post("/coupons/get", { userId })
            setCoupons(res.data.coupons)
        } catch (error) {
            toast.error("Erro, tente novamente")
            navigate("/")
        }

        setLoading(false)
    }

    useEffect(() => {
        getCoupons()
    }, [])

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <>
                    <div className={styles.coupons}>
                        { 
                            coupons.map(coupon => (
                                <div key={coupon.id}>
                                    <p>Codigo: {coupon.code}</p>
                                    <p>Desconto: {coupon.percentage ? `${coupon.quantity}%` : `R$${coupon.quantity.toFixed(2)}`}</p>
                                    <p>Minimo: {coupon.minimum}</p>
                                    <p>{coupon.valid ? "Valido" : "Invalido"}</p>

                                    <div>
                                        <button 
                                            onClick={() => console.log("testeee")}
                                        >Mudar Validade</button>

                                        <button 
                                            onClick={() => console.log("testeee")}
                                        >Excluir</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default Coupons
