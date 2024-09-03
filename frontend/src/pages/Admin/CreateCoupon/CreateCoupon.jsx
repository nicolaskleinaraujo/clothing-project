// CSS
import styles from "./CreateCoupon.module.css"

// Modules
import dbFetch from "../../../config/axios"
import { useState, useContext } from "react"
import { toast } from "react-toastify"
import { UserContext } from "../../../context/UserContext"
import { LoadingContext } from "../../../context/LoadingContext"

const CreateCoupon = () => {
    const { userId } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)

    const [code, setCode] = useState("")
    const [percentage, setPercentage] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [minimum, setMinimum] = useState(0)

    return (
        <div>
            CreateCoupon
        </div>
    )
}

export default CreateCoupon
