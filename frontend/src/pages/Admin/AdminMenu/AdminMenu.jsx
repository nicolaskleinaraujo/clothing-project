// CSS
import styles from "./AdminMenu.module.css"

// Modules
import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { Link } from "react-router-dom"

const AdminMenu = () => {
    const [productsOpen, setProductsOpen] = useState(false)
    const [categoriesOpen, setCategoriesOpen] = useState(false)
    const [ordersOpen, setOrdersOpen] = useState(false)
    const [couponsOpen, setCouponsOpen] = useState(false)

    return (
        <div>
            <div 
                onMouseEnter={() => setProductsOpen(true)} 
                onMouseLeave={() => setProductsOpen(false)} 
                onClick={() => setProductsOpen(!productsOpen)} 
            >
                <button>Produtos <IoIosArrowDown /></button>
                <div>
                    <Link to={"/"}>Criar Produto</Link>
                    <Link to={"/"}>Atualizar Produto</Link>
                </div>
            </div>

            <Link to={"/"}>Categorias</Link>
            <Link to={"/"}>Pedidos</Link>
            <Link to={"/"}>Cupons</Link>
        </div>
    )
}

export default AdminMenu
