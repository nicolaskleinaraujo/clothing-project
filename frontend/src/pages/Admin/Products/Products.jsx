// CSS
import styles from "./Products.module.css"

// Modules
import dbFetch from "../../../config/axios"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { LoadingContext } from "../../../context/LoadingContext"
import { toast } from "react-toastify"
import Loading from "../../../components/Loading/Loading"

const Products = () => {
    const navigate = useNavigate()
    const { loading, setLoading } = useContext(LoadingContext)

    const [products, setProducts] = useState([])

    const getProducts = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.get("/products")

            setProducts(res.data.products)

            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
            navigate("/admin")
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <div className={styles.products}>
                    <div className={styles.products_products}>
                        {
                            products.map(product => (
                                <div key={product.id}>
                                    <img src={`${import.meta.env.VITE_API_URL}/images/${product.image.split(", ")[0]}`} alt="Foto Produto" />
                                    <p>{product.name}</p>
                                    <p>R${product.price.toFixed(2)}</p>
                                    <p>Tamanhos: {product.sizes.map(size => size.size + ", ")}</p>
                                    <p>Cores: {product.colors}</p>
                                    <p>Estoque: {product.quantity}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default Products
