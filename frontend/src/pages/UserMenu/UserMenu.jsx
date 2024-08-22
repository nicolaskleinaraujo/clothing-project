// CSS
import styles from "./UserMenu.module.css"

// Modules
import dbFetch from "../../config/axios"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { toast } from "react-toastify"
import { FiUser, FiBook, FiUserX } from "react-icons/fi"
import { CiDeliveryTruck } from "react-icons/ci"

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
        <div className={styles.user_menu}>
            <Link>Minha conta <FiUser /></Link>
            <Link to={"/address-menu"}>Endereços <CiDeliveryTruck /></Link>
            <Link to={`/orders/${userId}`}>Meus pedidos <FiBook /></Link>
            <button onClick={removeAuth}>Sair <FiUserX /></button>
        </div>
    )
}

export default UserMenu
