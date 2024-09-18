// CSS
import styles from "./Home.module.css"

// dbFetch
import dbFetch from "../../config/axios"

// Modules
import { useState, useEffect, useContext } from "react"
import { MdReadMore, MdFirstPage, MdLastPage } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"
import Loading from "../../components/Loading/Loading"
import { LoadingContext } from "../../context/LoadingContext"

const Home = () => {
    const navigate = useNavigate()
    const { loading, setLoading } = useContext(LoadingContext)

    const [products, setProducts] = useState([])
    const [pages, setPages] = useState(0)

    const [currentPage, setCurrentPage] = useState(1)
    const [startPage, setStartPage] = useState(0)
    const [endPage, setEndPage] = useState(0)

    const getProducts = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.get(`/products?page=${currentPage}`)
            setProducts(res.data.products)
            setPages(res.data.totalPages)

            // Calculates the pages to be shown on the pagination system
            if (res.data.totalPages === 1) {
                setStartPage(1)
                setEndPage(1)
            } else if (res.data.totalPages > 1) {
                setStartPage(Math.max(1, currentPage - 1))
                setEndPage(Math.min(res.data.totalPages, currentPage + 1))
            }
        } catch (error) {
            return getProducts()
        }

        setLoading(false)
    }

    useEffect(() => {
        getProducts()
    }, [currentPage])

    return (
        <div className={styles.home}>
            { loading ? (
                <Loading />
            ) : (
                <>
                    {/* TODO create carrousel of promotions */}

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

                    <div className={styles.home_pagination}>
                        { currentPage > 2 && <button onClick={() => setCurrentPage(1)}><MdFirstPage /></button> }

                        { currentPage > 2 && <button style={{ cursor: "default" }}>...</button> }

                        {
                            pages > 1 ? (
                                Array.from({ length: pages }, (_, index) => index + 1).slice(startPage - 1, endPage).map(page => (
                                    <button 
                                        key={page} 
                                        onClick={() => setCurrentPage(page)} 
                                        style={{ backgroundColor: currentPage === page && "#F5DADF", cursor: currentPage === page && "default" }}
                                    >{page}</button>
                                ))
                            ) : (
                                <button style={{ backgroundColor: "#F5DADF", cursor: "default" }}>1</button>
                            )
                        }

                        { endPage < pages && <button style={{ cursor: "default" }}>...</button> }

                        { currentPage < pages && pages > 3 && <button onClick={() => setCurrentPage(pages)}><MdLastPage /></button> }
                    </div>
                </>
            )}
        </div>
    )
}

export default Home