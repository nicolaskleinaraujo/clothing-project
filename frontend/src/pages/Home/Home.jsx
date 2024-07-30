// CSS
import styles from "./Home.module.css"

// dbFetch
import dbFetch from "../../config/axios"

// Modules
import { useState, useEffect } from "react"
import { MdOutlineAddShoppingCart } from "react-icons/md"

const Home = () => {
    const [products, setProducts] = useState([])

    const getProducts = async() => {
        const res = await dbFetch.get("/products")
        setProducts(res.data.products)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className={styles.home}>
            <div className={styles.home_products}>
                {
                    products && products.map(product => (
                        <div key={product.id}>
                            <img src={`${import.meta.env.VITE_API_URL}/images/${product.image}`} alt="Foto Produto" />
                            <p>{product.name}</p>
                            <p>R${product.price}</p>
                            <button><MdOutlineAddShoppingCart /></button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home