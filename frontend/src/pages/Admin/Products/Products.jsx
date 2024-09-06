// CSS
import styles from "./Products.module.css"

// Modules
import dbFetch from "../../../config/axios"
import { useState, useEffect, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { LoadingContext } from "../../../context/LoadingContext"
import { UserContext } from "../../../context/UserContext"
import { toast } from "react-toastify"
import Loading from "../../../components/Loading/Loading"

const Products = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)
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
    }, [])

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <div className={styles.products}>
                    <h1>Produtos</h1>

                    <div className={styles.products_products}>
                        {
                            products.map(product => (
                                <div key={product.id}>
                                    <img src={`${import.meta.env.VITE_API_URL}/images/${product.image.split(", ")[0]}`} alt="Foto Produto" />
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

export default Products
