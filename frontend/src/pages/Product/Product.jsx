// CSS
import styles from "./Product.module.css"

// dbFetch
import dbFetch from "../../config/axios"

// Modules
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const Product = () => {
    const { slug } = useParams()
    const [product, setProduct] = useState({})
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])

    const getProduct = async() => {
        const res = await dbFetch.get(`/products/slug/${slug}`)
        setProduct(res.data.product)
        setColors(res.data.product.colors.split(", "))
        setSizes(res.data.product.sizes)
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div className={styles.product}>
            { product && 
                <div>
                    <img src={`${import.meta.env.VITE_API_URL}/images/${product.image}`} alt="Foto Produto" />
                    
                    <div>
                        <p>{product.name}</p>
                        <p>{product.price}</p>

                        <h2>Cor</h2>
                        { colors &&
                            colors.map((color, index) => (
                                <label>
                                    <p>{color}</p>
                                    <input type="radio" name="colors" id="colors" value={color} key={index} />
                                </label>
                            ))
                        }

                        <h2>Tamanho</h2>
                        { sizes &&
                            sizes.map(size => (
                                <label>
                                    <p>{size.size}</p>
                                    <input type="radio" name="sizes" id="sizes" value={size.size} key={size.id} />
                                </label>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Product