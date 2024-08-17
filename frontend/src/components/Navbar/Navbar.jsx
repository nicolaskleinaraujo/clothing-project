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
    const { userId, setUserId, setIsAdmin } = useContext(UserContext)

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

    const removeAuth = async() => {
        try {
            await dbFetch.get("/users/removeauth")

            setUserId(0)
            setIsAdmin(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getInfos()
    }, [])

    return (
        <div className={styles.navbar}>
            <Link to="/"><img src="/project-logo.png" alt="Logo do Projeto" /></Link>

            <div 
                className={styles.navbar_category} 
                onMouseEnter={() => setCategoriesOpen(true)} 
                onMouseLeave={() => setCategoriesOpen(false)} 
                onClick={() => setCategoriesOpen(!categoriesOpen)} 
            >
                <button>Categorias <IoIosArrowDown /></button>
                <div className={categoriesOpen ? styles.navbar_category_open_content : styles.navbar_category_content}>
                    {
                        categories && categories.map(category => (
                            <Link to={`/sort-products/category=${category.id}`} key={category.id}>{category.name}</Link>
                        ))
                    }
                </div>
            </div>

            <div 
                className={styles.navbar_size} 
                onMouseEnter={() => setSizesOpen(true)} 
                onMouseLeave={() => setSizesOpen(false)} 
                onClick={() => setSizesOpen(!sizesOpen)} 
            >
                <button>Tamanhos <IoIosArrowDown /></button>
                <div className={sizesOpen ? styles.navbar_size_open_content : styles.navbar_size_content}>
                    {
                        sizes && sizes.map(size => (
                            <Link to={`/sort-products/sizes=${size.size}`} key={size.id}>{size.size}</Link>
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
                        > 
                            <Link to={`/orders/${userId}`}>Pedidos</Link> 
                            <Link to={"/address"}>Endereço</Link>
                            <button onClick={removeAuth}>Sair</button>
                        </div>
                    </>
                )}

                <Link to="/cart"><FiShoppingBag /></Link>
            </div>
        </div>
    )
}

export default Navbar
