// CSS
import styles from "./Product.module.css"

// dbFetch
import dbFetch from "../../config/axios"

// Modules
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { toast } from "react-toastify"
import { UserContext } from "../../context/UserContext"
import { LoadingContext } from "../../context/LoadingContext"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import Loading from "../../components/Loading/Loading"

const Product = () => {
    const { slug } = useParams()
    const { loading, setLoading } = useContext(LoadingContext)
    const navigate = useNavigate()

    const [product, setProduct] = useState({})
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])

    const [images, setImages] = useState([])
    const [imageIndex, setImageIndex] = useState(0)

    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSize, setSelectedSize] = useState(0)
    const { userId } = useContext(UserContext)

    const getProduct = async() => {
        const res = await dbFetch.get(`/products/slug/${slug}`)

        setProduct(res.data.product)
        setColors(res.data.product.colors.split(", "))
        setSizes(res.data.product.sizes)

        setImages([
            `${import.meta.env.VITE_API_URL}/images/${res.data.product.image}`,
        ])

        setLoading(false)
    }

    const addToCart = async() => {
        if (userId === 0) {
            toast.info("Faça seu login")
            navigate("/login")
            return
        }

        if (selectedColor === "" || selectedSize === 0) {
            toast.info("Escolha a cor e o tamanho")
            return
        }

        try {
            const res = await dbFetch.post("/cart", {
                "productId": product.id,
                "sizeId": parseInt(selectedSize),
                "quantity": 1,
                "color": selectedColor,
                "userId": userId,
            })
    
            toast.success(res.data.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    const changeImage = (direction) => {
        if (direction === "NEXT") {
            if (imageIndex + 1 === images.length) {
                setImageIndex(0)
            } else if (imageIndex < images.length) {
                setImageIndex(imageIndex + 1)
            }
        } else if (direction === "PREV") {
            if (imageIndex - 1 < 0) {
                setImageIndex(images.length - 1)
            } else if (imageIndex < images.length) {
                setImageIndex(imageIndex - 1)
            }
        }
    }

    useEffect(() => {
        setLoading(true)
        getProduct()
    }, [])

    return (
        <div className={styles.product}>
            { loading ? (
                <Loading />
            ) : (
                <div>
                    <div className={styles.product_carousel}>
                        <FiArrowLeft onClick={() => changeImage("PREV")} />
                        <img src={images[imageIndex]} alt="Foto Produto" />
                        <FiArrowRight onClick={() => changeImage("NEXT")} />
                    </div>

                    <p style={{ fontFamily: "Yeseva one, sans-serif" }}>{product.name}</p>
                    <p style={{ color: "#70012b" }}>R${product.price}</p>
                    <p style={{ fontSize: "1.5em", color: "#70012b", fontWeight: "bolder", marginLeft: ".7em" }}>Parcelamos até 5x no cartão</p>

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

                    <p style={{ fontSize: "1.5em", fontWeight: "lighter", paddingBottom: "1.8em" }}>{product.description}</p>
                </div>
            )}
        </div>
    )
}

export default Product