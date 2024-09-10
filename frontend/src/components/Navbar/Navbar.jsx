// CSS
import styles from "./Navbar.module.css"

// Axios
import dbFetch from "../../config/axios"

// Modules
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { FiUser, FiShoppingBag, FiMenu } from "react-icons/fi"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)

    const [hiddenMenu, setHiddenMenu] = useState(false)
    const [selectedSizes, setSelectedSizes] = useState("")

    const [categories, setCategories] = useState([])
    const [sizes, setSizes] = useState([])

    const getInfos = async() => {
        const res = await dbFetch.get("/categories")
        setCategories(res.data.categories)
        setSizes(res.data.sizes)
    }

    const handleSelect = (e) => {
        const selectedSizesArray = selectedSizes.split(",")

        if (selectedSizesArray.length === 0) {
            setSelectedSizes(e)
        } else if (selectedSizesArray.length > 0) {
            if (selectedSizesArray.includes(e)) {
                const index = selectedSizesArray.indexOf(e)
                selectedSizesArray.splice(index, 1)

                setSelectedSizes(selectedSizesArray.join(","))
            }

            setSelectedSizes((prevSizes) => `${prevSizes},${e}`)
        }

        console.log(selectedSizesArray)
    }

    const handleFilter = () => {
        const path = location.pathname.replace(/^\/|\/[^\/]*$/g, '')

        if (path === "sort-products") {
            navigate(`${location.pathname}&sizes=${selectedSizes}`)
        }
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
                        <li key={category.id}>
                            <Link to={`/sort-products/category=${category.id}`}>{category.name}</Link>
                        </li>
                    ))}
                </ul>

                <h2>Tamanhos</h2>
                    { sizes && sizes.map(size => (
                        <label key={size.id}>
                            <input 
                                type="checkbox" 
                                name="size" 
                                id="size" 
                                value={size.size} 
                                onChange={(e) => handleSelect(e.target.value)} 
                            />
                            <p>{size.size}</p>
                        </label>
                    ))}

                    <button onClick={() => handleFilter()}>Filtrar</button>
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
