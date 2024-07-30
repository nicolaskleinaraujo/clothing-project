// CSS
import styles from "./Navbar.module.css"

// Axios
import dbFetch from "../../config/axios"

// Modules
import { useState, useEffect } from "react"

const Navbar = () => {
    const [categories, setCategories] = useState([])
    const [sizes, setSizes] = useState([])

    const getInfos = async() => {
        const categoryData = await dbFetch.get("/categories")
        setCategories(categoryData.data.categories)
    }

    useEffect(() => {
        getInfos()
    }, [])

    return (
        <div className={styles.navbar}>
            <img src="https://via.placeholder.com/70x70" alt="Logo do Projeto" />

            <div className={styles.category}>
                <button>Categorias &#8595;</button>
                <div className={styles.category_content}>
                    {
                        categories && categories.map(category => (
                            <a href="#" key={category.id}>{category.name}</a>
                        ))
                    }
                </div>
            </div>

            <div className={styles.size}>
                <button>Tamanhos &#8595;</button>
                <div className={styles.size_content}>
                    <a href="#">Tamanho 1</a>
                </div>
            </div>

            <div className={styles.account}>
                <a href="#">conta</a>
                <a href="#">pedidos</a>
            </div>
        </div>
    )
}

export default Navbar
