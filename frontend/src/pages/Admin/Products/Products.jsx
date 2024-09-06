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

    const [product, setProduct] = useState({})

    const getProduct = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.get(`/products/slug/${slug}`)

            setProduct(res.data.product)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.msg)
            navigate("/admin/products")
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
