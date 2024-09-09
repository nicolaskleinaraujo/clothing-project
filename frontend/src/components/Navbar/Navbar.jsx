// CSS
import styles from "./Navbar.module.css"

// Axios
import dbFetch from "../../config/axios"

// Modules
import { useState, useEffect, useContext } from "react"
import { FiUser, FiShoppingBag, FiMenu } from "react-icons/fi"
import { IoIosArrowDown } from "react-icons/io"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"

const Navbar = () => {
    const { userId } = useContext(UserContext)
    const [hiddenMenu, setHiddenMenu] = useState(false)

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
            <div className={styles.navbar_menu}>
                <button onClick={() => setHiddenMenu(!hiddenMenu)}><FiMenu /></button>
            </div>

            <div className={styles.navbar_hidden_menu} style={{ display: hiddenMenu ? "flex" : "none" }}>
                <h2>Categorias</h2>
                <ul>
                    { categories && categories.map(category => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ul>

                <h2>Tamanhos</h2>
                    { sizes && sizes.map(size => (
                        <label>
                            <input type="checkbox" name="size" id="size" value={size.size} />
                            <p>{size.size}</p>
                        </label>
                    ))}
            </div>

            <Link to="/"><img src="/project-big-logo.png" alt="Logo do Projeto" /></Link>

            <div className={styles.navbar_account}>
                <Link to={userId === 0 ? "/login" : "/menu"}><FiUser /></Link>
                <Link to="/cart"><FiShoppingBag /></Link>
            </div>
        </div>
    )
}

export default Navbar
