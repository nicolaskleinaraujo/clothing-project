// CSS
import styles from "./Product.module.css"

// dbFetch
import dbFetch from "../../config/axios"

// Modules
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Product = () => {
    const { slug } = useParams()
    const [product, setProduct] = useState({})
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])

    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSize, setSelectedSize] = useState(0)

    const getProduct = async() => {
        const res = await dbFetch.get(`/products/slug/${slug}`)
        setProduct(res.data.product)
        setColors(res.data.product.colors.split(", "))
        setSizes(res.data.product.sizes)
    }

    const addToCart = async() => {
        try {
            const res = await dbFetch.post("/cart", {
                "productId": product.id,
                "sizeId": parseInt(selectedSize),
                "quantity": 1,
                "color": selectedColor,
                "userId": 1
            })
    
            toast.success(res.data.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div className={styles.product}>
            { product && 
                <div>
                    <img src={`${import.meta.env.VITE_API_URL}/images/${product.image}`} alt="Foto Produto" />

                    <p>{product.name}</p>
                    <p style={{ color: "red" }}>R${product.price}</p>

                    <h2>Cor</h2>
                    <div className={styles.product_colors}>
                        { colors &&
                            colors.map((color, index) => (
                                <label key={index}>
                                    <input 
                                        type="radio" 
                                        name="colors" 
                                        id="colors" 
                                        value={color} 
                                        onChange={(e) => setSelectedColor(e.target.value)} 
                                    />
                                    <p>{color}</p>
                                </label>
                            ))
                        }
                    </div>

                    <h2>Tamanho</h2>
                    <div className={styles.product_sizes}>
                        { sizes &&
                            sizes.map(size => (
                                <label key={size.id}>
                                    <input 
                                        type="radio" 
                                        name="sizes" 
                                        id="sizes" 
                                        value={size.id} 
                                        onChange={(e) => setSelectedSize(e.target.value)} 
                                    />
                                    <p>{size.size}</p>
                                </label>
                            ))
                        }
                    </div>

                    <button onClick={() => addToCart()}>ADICIONAR AO CARRINHO</button>
                </div>
            }
        </div>
    )
}

export default Product