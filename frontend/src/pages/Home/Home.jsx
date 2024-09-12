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
    const navigate = useNavigate()
    const { loading, setLoading } = useContext(LoadingContext)

    const [products, setProducts] = useState([])
    const [pages, setPages] = useState(0)

    const getProducts = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.get("/products?page=1")
            setProducts(res.data.products)
            setPages(res.data.totalPages)
        } catch (error) {
            return getProducts()
        }

        setLoading(false)
    }

    useEffect(() => {
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

                        <div className={styles.home_pagination}>
                            {
                                products && Array(pages).fill().map((_, index) => (
                                    <button>{index + 1}</button>
                                ))
                            }
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Home