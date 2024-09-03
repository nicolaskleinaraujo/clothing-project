// CSS
import styles from "./Categories.module.css"

// Modules
import dbFetch from "../../../config/axios"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { LoadingContext } from "../../../context/LoadingContext"
import { toast } from "react-toastify"
import Loading from "../../../components/Loading/Loading"

const Categories = () => {
    const navigate = useNavigate()
    const { loading, setLoading } = useContext(LoadingContext)

    const [categories, setCategories] = useState([])

    const getCategories = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.get("/categories")
            setCategories(res.data.categories)
        } catch (error) {
            toast.error("Erro, tente novamente")
            navigate("/")
        }

        setLoading(false)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <>
                    <div className={styles.categories}>
                        { 
                            categories.map(category => (
                                <div key={category.id}>
                                    <p>{category.name}</p>

                                    <div>
                                        <button 
                                            onClick={() => console.log("updated")}
                                        >Atualizar</button>

                                        <button 
                                            onClick={() => console.log("deleted")}
                                        >Excluir</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default Categories
