// CSS
import styles from "./Product.module.css"

// dbFetch
import dbFetch from "../../config/axios"

// Modules
import { useParams } from "react-router-dom"

const Product = () => {
    const { slug } = useParams()

    return (
        <div>
            <h1>Product</h1>
            {slug && console.log(slug)}
        </div>
    )
}

export default Product