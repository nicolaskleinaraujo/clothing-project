// CSS
import styles from "./Categories.module.css"

// Modules
import dbFetch from "../../../config/axios"
import { useState, useEffect } from "react"

const Categories = () => {
    const [categories, setCategories] = useState([])

    const getCategories = async() => {
        const res = await dbFetch.get("/categories")
        setCategories(res.data.categories)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div>Categories</div>
    )
}

export default Categories
