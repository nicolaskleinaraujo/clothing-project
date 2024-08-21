// CSS
import styles from "./UserMenu.module.css"

// Modules
import dbFetch from "../../config/axios"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { toast } from "react-toastify"

const UserMenu = () => {
    const navigate = useNavigate()
    const { userId, setUserId } = useContext(UserContext)

    const removeAuth = async() => {
        try {
            await dbFetch.get("/users/removeauth")
            setUserId(0)

            toast.info("Saiu com sucesso")
            navigate("/")
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    return (
        <div>
            <Link>Minha conta</Link>
            <Link>Endereços</Link>
            <Link to={`/orders/${userId}`}>Meus pedidos</Link>
            <button onClick={removeAuth}>Sair</button>
        </div>
    )
}

export default UserMenu
