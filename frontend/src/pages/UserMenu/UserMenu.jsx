// CSS
import styles from "./UserMenu.module.css"

// Modules
import dbFetch from "../../config/axios"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

const UserMenu = () => {
    const { userId } = useContext(UserContext)

    const removeAuth = async() => {
        console.log("removed!")
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
