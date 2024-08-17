// CSS
import styles from "./SortProducts.module.css"

// Modules
import dbFetch from "../../config/axios"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

const SortProducts = () => {
    const { filter } = useParams()

    const filterProducts = async() => {
        const res = await dbFetch.get(`/products?${filter}`)
        console.log(res.data)
    }

    useEffect(() => {
        filterProducts()
    }, [])

    return (
        <div>SortProducts</div>
    )
}

export default SortProducts
