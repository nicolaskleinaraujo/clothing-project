// CSS
import styles from "./Home.module.css"

// dbFetch
import dbFetch from "../../config/axios"

// Modules
import { useState, useEffect, useContext } from "react"
import { MdReadMore } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"
import Loading from "../../components/Loading/Loading"
import { LoadingContext } from "../../context/LoadingContext"

const Home = () => {
    const { loading, setLoading } = useContext(LoadingContext)
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    const getProducts = async() => {
        const res = await dbFetch.get("/products?page=1")
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
                                        <img src={`data:image/png;base64,${product.Images[0].content}`} alt="Foto Produto" />
                                        <p>{product.name}</p>
                                        <p>R${product.price.toFixed(2)}</p>
                                        <button onClick={() => navigate(`/products/${product.slug}`)}><MdReadMore /></button>
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