// CSS
import styles from "./Home.module.css"

// dbFetch
import dbFetch from "../../config/axios"

// Modules
import { useState, useEffect } from "react"

const Home = () => {
    const [products, setProducts] = useState([])

    const getProducts = async() => {
        const res = await dbFetch.get("/products")
        setProducts(res.data.products)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => console.log(import.meta.env.VITE_API_URL)}>TESTE</button>

            {
                products && products.map(product => (
                    <div key={product.id}>
                        <img src={`${import.meta.env.VITE_API_URL}/images/${product.image}`} alt="Foto Produto" width={150} />
                        {product.name}
                        R${product.price}
                    </div>
                ))
            }
        </div>
    )
}

export default Home