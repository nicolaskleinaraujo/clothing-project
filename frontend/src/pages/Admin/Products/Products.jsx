// CSS
import styles from "./Products.module.css"

// Modules
import dbFetch from "../../../config/axios"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { LoadingContext } from "../../../context/LoadingContext"
import { toast } from "react-toastify"

const Products = () => {
    const navigate = useNavigate()
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

    return (
        <div>

        </div>
    )
}

export default Products
