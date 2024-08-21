// CSS
import styles from "./AddressMenu.module.css"

// Modules
import dbFetch from "../../config/axios"
import { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AddressMenu = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)

    const getAddresses = async() => {
        try {
            const res = await dbFetch.post("/address/user", {
                "id": userId,
                "userId": userId,
            })

            console.log(res.data)
        } catch (error) {
            if (error.response.data.msg === "Endereço não encontrado") {
                toast.info("Adicione o seu endereço")
                navigate("/address")
                return
            }

            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        getAddresses()
    } ,[])

    return (
        <div>AddressMenu</div>
    )
}

export default AddressMenu
