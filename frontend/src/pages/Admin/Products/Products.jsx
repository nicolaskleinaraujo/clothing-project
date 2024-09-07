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

    const [productId, setProductId] = useState(0)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [sizes, setSizes] = useState("")
    const [colors, setColors] = useState("")
    const [quantity, setQuantity] = useState("")
    const [categoryId, setCategoryId] = useState(0)

    const getProduct = async() => {
        if (slug) {
            setLoading(true)

            try {
                const res = await dbFetch.get(`/products/slug/${slug}`)

                setProductId(res.data.product.id)
                setName(res.data.product.name)
                setDescription(res.data.product.description)

                const rawPrice = res.data.product.price
                handlePrice(rawPrice.toFixed(2))

                setSizes(res.data.product.sizes.map(size => size.size).join(", "))
                setColors(res.data.product.colors)
                setQuantity(res.data.product.quantity)
                setCategoryId(res.data.product.categoryId)

                setLoading(false)
            } catch (error) {
                toast.error(error.response.data.msg)
                navigate("/admin/products")
            }
        }
    }

    const handlePrice = (value) => {
        const input = value.toString().replace(/[\s()\-]/g, "").replace(/\D/g, "").replace(/^0/, "")

        if (input.length <= 2) {
            return setPrice(`0,${input.padStart(2, "0")}`)
        }

        const decimal = input.slice(0, -2)
        const integer = input.slice(-2)

        if (input.length >= 6 && input.length <= 8) {
            return setPrice(`${decimal.slice(0, -3)}.${decimal.slice(-3)},${integer}`)
        }

        if (input.length >= 9) {
            return setPrice(`${decimal.slice(0, -6)}.${decimal.slice(-6, -3)}.${decimal.slice(-3)},${integer}`)
        }

        return setPrice(`${decimal},${integer}`)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (slug === undefined) {
                console.log("Created")
            } else if (slug !== undefined) {
                const res = await dbFetch.put("/products", {
                    id: productId,
                    name,
                    description,
                    price,
                    sizes,
                    colors,
                    quantity,
                    categoryId,
                    userId,
                })

                toast.success(res.data.msg)
            }

            return navigate("/admin/products")
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <form onSubmit={handleSubmit} className={styles.products}>
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
                            required 
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </label>

                    <label>
                        <p>Preço</p>
                        <input 
                            type="text" 
                            name="price" 
                            id="price" 
                            required 
                            onChange={(e) => handlePrice(e.target.value)} 
                            value={price} 
                        />
                    </label>

                    <label>
                        <p>Tamanhos</p>
                        <input 
                            type="text" 
                            name="sizes" 
                            id="sizes" 
                            required 
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
                            required 
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
                            required 
                            onChange={(e) => setQuantity(e.target.value)}  
                            value={quantity} 
                        />
                    </label>

                    <input type="submit" value={slug === undefined ? "Criar" : "Atualizar"} />
                </form>
            )}
        </div>
    )
}

export default Products
