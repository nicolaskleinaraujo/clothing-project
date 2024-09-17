// CSS
import styles from "./SortProducts.module.css"

// Modules
import dbFetch from "../../config/axios"
import { MdReadMore } from "react-icons/md"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
import { LoadingContext } from "../../context/LoadingContext"
import { toast } from "react-toastify"
import Loading from "../../components/Loading/Loading"

const SortProducts = () => {
    // TODO add pagination
    const navigate = useNavigate()
    const { filter } = useParams()
    const { loading, setLoading } = useContext(LoadingContext)

    const [products, setProducts] = useState([])

    const filterProducts = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.get(`/products?${filter}`)
            setProducts(res.data.products)

            if (res.data.product.length === 0) {
                toast.info("Nenhum produto com o filtro selecionado")
                navigate("/")
            }
        } catch (error) {
            toast.info("Nenhum produto com o filtro selecionado")
            navigate("/")
        }
    }

    useEffect(() => {
        filterProducts()
    }, [filter])

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

export default SortProducts
