// CSS
import styles from "./Products.module.css"

// Modules
import dbFetch from "../../../config/axios"
import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { LoadingContext } from "../../../context/LoadingContext"
import { UserContext } from "../../../context/UserContext"
import { toast } from "react-toastify"
import Loading from "../../../components/Loading/Loading"

const Products = () => {
    const navigate = useNavigate()
    const { slug } = useParams()
    const { loading, setLoading } = useContext(LoadingContext)
    const { userId } = useContext(UserContext)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [sizes, setSizes] = useState("")
    const [colors, setColors] = useState("")
    const [quantity, setQuantity] = useState(0)

    const getProduct = async() => {
        if (slug) {
            setLoading(true)

            try {
                const res = await dbFetch.get(`/products/slug/${slug}`)

                setName(res.data.product.name)
                setDescription(res.data.product.description)
                setPrice(res.data.product.price)
                setSizes(res.data.product.sizes.map(size => size.size).join(", "))
                setColors(res.data.product.colors)
                setQuantity(res.data.product.quantity)

                setLoading(false)
            } catch (error) {
                toast.error(error.response.data.msg)
                navigate("/admin/products")
            }
        }
    }

    const handlePrice = (e) => {
        console.log(e.target.value)
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <form onSubmit={console.log("Submited")} className={styles.products}>
                    { slug === undefined ? (
                        <h1>Novo Produto</h1>
                    ) : (
                        <h1>Atualizar Produto</h1>
                    )}

                    <label>
                        <p>Nome</p>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            value={name} 
                            required
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </label>

                    <label>
                        <p>Descrição</p>
                        <textarea 
                            name="description" 
                            id="description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </label>

                    <label>
                        <p>Preço</p>
                        <input 
                            type="text" 
                            name="price" 
                            id="price" 
                            onChange={(e) => handlePrice(e)} 
                            value={price} 
                        />
                    </label>

                    <label>
                        <p>Tamanhos</p>
                        <input 
                            type="text" 
                            name="sizes" 
                            id="sizes" 
                            onChange={(e) => setSizes(e.target.value)} 
                            value={sizes} 
                            placeholder="Preto, Azul"
                        />
                    </label>

                    <label>
                        <p>Cores</p>
                        <input 
                            type="text" 
                            name="colors" 
                            id="colors" 
                            onChange={(e) => setColors(e.target.value)} 
                            value={colors} 
                        />
                    </label>

                    <label>
                        <p>Quantidade</p>
                        <input 
                            type="text" 
                            name="quantity" 
                            id="quantity" 
                            onChange={(e) => setQuantity(e.target.value)}  
                            value={quantity} 
                        />
                    </label>
                </form>
            )}
        </div>
    )
}

export default Products
