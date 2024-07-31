// CSS
import styles from "./Navbar.module.css"

// Axios
import dbFetch from "../../config/axios"

// Modules
import { useState, useEffect } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { FiUser, FiShoppingBag } from "react-icons/fi"
import { Link } from "react-router-dom"

const Navbar = () => {
    const [categories, setCategories] = useState([])
    const [sizes, setSizes] = useState([])

    const getInfos = async() => {
        const res = await dbFetch.get("/categories")
        setCategories(res.data.categories)
        setSizes(res.data.sizes)
    }

    useEffect(() => {
        getInfos()
    }, [])

    return (
        <div className={styles.navbar}>
            <Link to="/"><img src="/project-logo.png" alt="Logo do Projeto" /></Link>

            <div className={styles.category}>
                <button>Categorias <IoIosArrowDown /></button>
                <div className={styles.category_content}>
                    {
                        categories && categories.map(category => (
                            <a href="#" key={category.id}>{category.name}</a>
                        ))
                    }
                </div>
            </div>

            <div className={styles.size}>
                <button>Tamanhos <IoIosArrowDown /></button>
                <div className={styles.size_content}>
                    {
                        sizes && sizes.map(size => (
                            <a href="#" key={size.id}>{size.size}</a>
                        ))
                    }
                </div>
            </div>

            <div className={styles.account}>
                <a href="#"><FiUser /></a>
                <Link to="/cart"><FiShoppingBag /></Link>
            </div>
        </div>
    )
}

export default Navbar
