// CSS
import styles from "./SortProducts.module.css"

// Modules
import dbFetch from "../../config/axios"
import { MdReadMore } from "react-icons/md"
import { useParams, Link } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
import { LoadingContext } from "../../context/LoadingContext"
import Loading from "../../components/Loading/Loading"

const SortProducts = () => {
    const { filter } = useParams()
    const { loading, setLoading } = useContext(LoadingContext)

    const [products, setProducts] = useState([])

    const filterProducts = async() => {
        setLoading(true)

        const res = await dbFetch.get(`/products?${filter}`)
        setProducts(res.data.products)

        setLoading(false)
    }

    useEffect(() => {
        filterProducts()
    }, [])

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <>
                    <div className={styles.sort_products}>
                        {
                            products && products.map(product => (
                                <Link to={`/product/${product.slug}`} key={product.id}>
                                    <div>
                                        <img src={`${import.meta.env.VITE_API_URL}/images/${product.image}`} alt="Foto Produto" />
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

export default SortProducts
