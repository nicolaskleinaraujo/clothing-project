// CSS
import styles from "./Home.module.css"

// dbFetch
import dbFetch from "../../config/axios"

// Modules
import { useState, useEffect, useContext } from "react"
import { MdReadMore } from "react-icons/md"
import { Link } from "react-router-dom"
import Loading from "../../components/Loading/Loading"
import { LoadingContext } from "../../context/LoadingContext"

const Home = () => {
    const { loading, setLoading } = useContext(LoadingContext)
    const [products, setProducts] = useState([])

    const getProducts = async() => {
        const res = await dbFetch.get("/products")
        setProducts(res.data.products)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getProducts()
    }, [])

    return (
        <div className={styles.home}>
            { loading ? (
                <Loading />
            ) : (
                <>
                    <div className={styles.home_products}>
                        {
                            products && products.map(product => (
                                <Link to={`/product/${product.slug}`} key={product.id}>
                                    <div>
                                        <img src={`${import.meta.env.VITE_API_URL}/images/${product.image}`} alt="Foto Produto" />
                                        <p>{product.name}</p>
                                        <p>R${product.price}</p>
                                        <Link to={`/product/${product.slug}`}><MdReadMore /></Link>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default Home