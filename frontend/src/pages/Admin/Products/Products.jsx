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

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div>EditProducts</div>
    )
}

export default Products
