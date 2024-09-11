// CSS
import styles from "./Products.module.css"

// Modules
import dbFetch from "../../../config/axios"
import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { LoadingContext } from "../../../context/LoadingContext"
import { UserContext } from "../../../context/UserContext"
import { toast } from "react-toastify"
import { FiTrash } from "react-icons/fi" 
import Loading from "../../../components/Loading/Loading"

const Products = () => {
    const navigate = useNavigate()
    const { slug } = useParams()
    const { loading, setLoading } = useContext(LoadingContext)
    const { userId } = useContext(UserContext)

    const [categories, setCategories] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([])

    const [productId, setProductId] = useState(0)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [sizes, setSizes] = useState("")
    const [colors, setColors] = useState("")
    const [quantity, setQuantity] = useState("")
    const [categoryId, setCategoryId] = useState(0)

    const getInfos = async() => {
        setLoading(true)

        if (slug) {
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
            } catch (error) {
                toast.error(error.response.data.msg)
                navigate("/admin/products")
            }
        }

        const categoriesRes = await dbFetch.get("/categories")
        setCategories(categoriesRes.data.categories)

        setLoading(false)
    }

    const handleNumber = (value, type) => {
        const input = value.toString().replace(/[\s()\-]/g, "").replace(/\D/g, "").replace(/^0/, "")

        if (type === "QUANT") {
            return setQuantity(input)
        }

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

    const handleImageChange = (file) => {
        if (file[0] !== undefined) {
            file[0].id = `${file[0].name}${Date.now()}`

            if (selectedFiles.length === 0) {
                console.log("teste")
                return setSelectedFiles([file[0]])
            }

            console.log(selectedFiles)
            setSelectedFiles([...selectedFiles, file[0]])
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        if (parseInt(categoryId) === 0) {
            return toast.error("Selecione a categoria")
        }

        try {
            let res

            if (slug === undefined) {
                const formData = new FormData()
                formData.append("name", name)
                formData.append("description", description)
                formData.append("price", price)
                formData.append("sizes", sizes)
                formData.append("colors", colors)
                formData.append("quantity", quantity)
                formData.append("categoryId", categoryId)
                selectedFiles.forEach(file => {
                    formData.append("file", file)
                })

                res = await dbFetch.post("/products", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
            } else if (slug !== undefined) {
                res = await dbFetch.put("/products", {
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
            }

            toast.success(res.data.msg)
            return navigate(`/product/${res.data.product.slug}`)
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    useEffect(() => {
        getInfos()
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
                        <p>Categoria</p>
                        <select name="category" id="category" defaultValue={"0"} onChange={(e) => setCategoryId(e.target.value)}>
                            <option value="0" disabled>--SELECIONE UMA CATEGORIA--</option>
                            { categories.map(category => (
                                <option value={category.id} key={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        <p>Preço</p>
                        <input 
                            type="text" 
                            name="price" 
                            id="price" 
                            required 
                            onChange={(e) => handleNumber(e.target.value)} 
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
                            placeholder="P, M, G"
                        />
                    </label>

                    <label>
                        <p>Cores</p>
                        <input 
                            type="text" 
                            name="colors" 
                            id="colors" 
                            required 
                            placeholder="Preto, Azul" 
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
                            onChange={(e) => handleNumber(e.target.value, "QUANT")}  
                            value={quantity} 
                        />
                    </label>

                    <label>
                        <p>Fotos</p>
                        <input 
                            type="file" 
                            id="images" 
                            name="images" 
                            onChange={(e) => handleImageChange(e.target.files)} 
                        />
                    </label>

                    { selectedFiles.length > 0 &&
                        selectedFiles.map(file => (
                            <div className={styles.products_images} key={file.id}>
                                <p>{file.name}</p>
                                <button 
                                    onClick={() => setSelectedFiles(selectedFiles.filter(filter => filter.id !== file.id))}
                                ><FiTrash /></button>
                            </div>
                        ))
                    }

                    <input type="submit" value={slug === undefined ? "Criar" : "Atualizar"} />
                </form>
            )}
        </div>
    )
}

export default Products
