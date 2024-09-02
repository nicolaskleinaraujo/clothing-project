// CSS
import styles from "./Coupons.module.css"

// Modules
import dbFetch from "../../../config/axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../context/UserContext"

const Coupons = () => {
    const { userId } = useContext(UserContext)
    const [loading, setLoading] = useState(true)

    const [coupons, setCoupons] = useState([])

    const getCoupons = async() => {
        if (!loading) { setLoading(true) }

        const res = await dbFetch.post("/coupons/get", { userId })
        setCoupons(res.data.coupons)

        setLoading(false)
    }

    useEffect(() => {
        getCoupons()
    }, [loading])

    return (
        <div>
            Coupons
        </div>
    )
}

export default Coupons
