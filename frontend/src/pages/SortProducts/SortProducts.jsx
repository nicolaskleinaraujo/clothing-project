// CSS
import styles from "./SortProducts.module.css"

// Modules
import dbFetch from "../../config/axios"
import { MdFirstPage, MdLastPage, MdReadMore } from "react-icons/md"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
import { LoadingContext } from "../../context/LoadingContext"
import { toast } from "react-toastify"
import Loading from "../../components/Loading/Loading"

const SortProducts = () => {
    const navigate = useNavigate()
    const { filter } = useParams()
    const { loading, setLoading } = useContext(LoadingContext)

    const [products, setProducts] = useState([])
    const [pages, setPages] = useState(0)

    const [currentPage, setCurrentPage] = useState(1)
    const [startPage, setStartPage] = useState(0)
    const [endPage, setEndPage] = useState(0)

    const filterProducts = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.get(`/products?${filter}&page=${currentPage}`)
            setProducts(res.data.products)
            setPages(res.data.totalPages)

            // Calculates the pages to be shown on the pagination system
            setStartPage(Math.max(1, currentPage - 1))
            setEndPage(Math.min(res.data.totalPages, currentPage + 1))

            if (res.data.products.length === 0) {
                toast.info("Nenhum produto com o filtro selecionado")
                return navigate("/")
            }
        } catch (error) {
            toast.info("Nenhum produto com o filtro selecionado")
            return navigate("/")
        }

        setLoading(false)
    }

    useEffect(() => {
        filterProducts()
    }, [filter, currentPage])

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

                    <div className={styles.sort_products_pagination}>
                        { currentPage > 1 && <button onClick={() => setCurrentPage(1)}><MdFirstPage /></button> }

                        { currentPage > 2 && <button style={{ cursor: "default" }}>...</button> }

                        { pages > 0 && 
                            Array.from({ length: pages }, (_, index) => index + 1).slice(startPage - 1, endPage).map(page => (
                                <button key={page} onClick={() => setCurrentPage(page)}>{page}</button>
                            ))
                        }

                        { endPage < pages && <button style={{ cursor: "default" }}>...</button> }

                        { currentPage < pages && <button onClick={() => setCurrentPage(pages)}><MdLastPage /></button> }
                    </div>
                </>
            )}
    </div>
    )
}

export default SortProducts
