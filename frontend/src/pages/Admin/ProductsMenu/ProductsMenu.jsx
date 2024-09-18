// CSS
import styles from "./ProductsMenu.module.css"

// Modules
import dbFetch from "../../../config/axios"
import { useState, useEffect, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { LoadingContext } from "../../../context/LoadingContext"
import { UserContext } from "../../../context/UserContext"
import { toast } from "react-toastify"
import Loading from "../../../components/Loading/Loading"

const ProductsMenu = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)
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

            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
            navigate("/admin")
        }
    }

    const handleAvaiableChange = async(id) => {
        setLoading(true)

        try {
            await dbFetch.patch("/products/avaiable", { id, userId })

            toast.success("Disponivel atualizado com sucesso")
            return getProducts()
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    const handleDelete = async(id) => {
        setLoading(true)

        try {
            await dbFetch.delete("/products", {
                data: { id, userId }
            })

            toast.success("Produto deletado com sucesso")
            return getProducts()
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [currentPage])

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <div className={styles.products}>
                    <h1>Produtos</h1>

                    <Link to={"/admin/products/edit/"}>Novo Produto</Link>

                    <div className={styles.products_pagination}>
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

                    <div className={styles.products_products}>
                        {
                            products.map(product => (
                                <div key={product.id}>
                                    <img src={`data:image/png;base64,${product.Images[0].content}`} alt="Foto Produto" />
                                    <p>{product.name}</p>
                                    <p>R${product.price.toFixed(2)}</p>
                                    <p>Tamanhos: {product.sizes.map(size => size.size + ", ")}</p>
                                    <p>Cores: {product.colors}</p>
                                    <p>Disponivel: {product.avaiable ? "Sim" : "Não"}</p>
                                    <p>Estoque: {product.quantity}</p>

                                    <Link to={`/admin/products/edit/${product.slug}`}>Editar</Link>
                                    <button onClick={() => handleAvaiableChange(product.id)}>Mudar Disponivel</button>
                                    <button onClick={() => handleDelete(product.id)}>Deletar</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductsMenu
