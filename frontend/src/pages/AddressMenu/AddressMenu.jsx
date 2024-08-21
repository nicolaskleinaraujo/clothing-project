// CSS
import styles from "./AddressMenu.module.css"

// Modules
import dbFetch from "../../config/axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { LoadingContext } from "../../context/LoadingContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Loading from "../../components/Loading/Loading"

const AddressMenu = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)

    const [addresses, setAddresses] = useState([])

    const getAddresses = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.post("/address/user", {
                "id": userId,
                "userId": userId,
            })

            setAddresses(res.data.address)

            setLoading(false)
        } catch (error) {
            if (error.response.data.msg === "Endereço não encontrado") {
                toast.info("Adicione o seu endereço")
                navigate("/address")
                return
            }

            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    useEffect(() => {
        getAddresses()
    } ,[])

    return (
        <div>
            { loading && <Loading /> }

            { !loading && <p>AddressMenu</p> }
        </div>
    )
}

export default AddressMenu
