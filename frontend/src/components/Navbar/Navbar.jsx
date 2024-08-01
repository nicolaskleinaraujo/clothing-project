// CSS
import styles from "./Navbar.module.css"

// Axios
import dbFetch from "../../config/axios"

// Modules
import { useState, useEffect, useContext } from "react"
import { FiUser, FiShoppingBag } from "react-icons/fi"
import { IoIosArrowDown } from "react-icons/io"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"

const Navbar = () => {
    const { userId } = useContext(UserContext)

    const [categoriesOpen, setCategoriesOpen] = useState(false)
    const [sizesOpen, setSizesOpen] = useState(false)
    const [userOpen, setUserOpen] = useState(false)

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

            <div className={styles.navbar_category} onMouseEnter={() => setCategoriesOpen(true)} onMouseLeave={() => setCategoriesOpen(false)}>
                <button>Categorias <IoIosArrowDown /></button>
                <div className={categoriesOpen ? styles.navbar_category_open_content : styles.navbar_category_content}>
                    {
                        categories && categories.map(category => (
                            <a href="#" key={category.id}>{category.name}</a>
                        ))
                    }
                </div>
            </div>

            <div className={styles.navbar_size} onMouseEnter={() => setSizesOpen(true)} onMouseLeave={() => setSizesOpen(false)}>
                <button>Tamanhos <IoIosArrowDown /></button>
                <div className={sizesOpen ? styles.navbar_size_open_content : styles.navbar_size_content}>
                    {
                        sizes && sizes.map(size => (
                            <a href="#" key={size.id}>{size.size}</a>
                        ))
                    }
                </div>
            </div>

            <div className={styles.navbar_account}>
                { userId === 0 ? (
                    <Link to="/login"><FiUser /></Link>
                ) : (
                    <>
                        <a onMouseEnter={() => setUserOpen(true)} onMouseLeave={() => setUserOpen(false)}><FiUser /></a>
                        <div 
                            onMouseEnter={() => setUserOpen(true)} 
                            onMouseLeave={() => setUserOpen(false)} 
                            className={userOpen ? styles.navbar_user_open_content : styles.navbar_user_content}
                        > <Link to={`/orders/${userId}`}>Pedidos</Link> </div>
                    </>
                )}

                <Link to="/cart"><FiShoppingBag /></Link>
            </div>
        </div>
    )
}

export default Navbar
