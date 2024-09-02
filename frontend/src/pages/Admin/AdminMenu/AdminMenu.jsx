// CSS
import styles from "./AdminMenu.module.css"

// Modules
import { Link } from "react-router-dom"
import { FiBook } from "react-icons/fi"
import { RiCoupon3Line } from "react-icons/ri"
import { TbCategory } from "react-icons/tb"
import { LuPencil } from "react-icons/lu"

const AdminMenu = () => {
    return (
        <div>
            <Link to={"/"}>Produtos <LuPencil /></Link>
            <Link to={"/"}>Categorias <TbCategory /></Link>
            <Link to={"/"}>Pedidos <FiBook /></Link>
            <Link to={"/"}>Cupons <RiCoupon3Line /></Link>
        </div>
    )
}

export default AdminMenu
