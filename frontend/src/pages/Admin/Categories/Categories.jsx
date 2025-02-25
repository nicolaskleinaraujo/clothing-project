// CSS
import styles from "./Categories.module.css"

// Modules
import dbFetch from "../../../config/axios"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"
import { LoadingContext } from "../../../context/LoadingContext"
import { toast } from "react-toastify"
import Loading from "../../../components/Loading/Loading"

const Categories = () => {
    const navigate = useNavigate()
    const { loading, setLoading } = useContext(LoadingContext)
    const { userId } = useContext(UserContext)

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

    const updateCategory = async(id) => {
        setLoading(true)

        try {
            const newCategory = prompt("Informe o novo nome desejado")

            if (newCategory !== null && newCategory !== "") {
                const res = await dbFetch.put("/categories", { id, name: newCategory, userId })

                toast.success(res.data.msg)

                return getCategories()
            }

            setLoading(false)
        } catch (error) {
            toast.error("Erro, tente novamente")
            setLoading(false)
        }
    }

    const deleteCategory = async(id) => {
        setLoading(true)

        try {
            if (confirm("Deletar essa categoria implica na deleção de todos os produtos e pedidos ligados a ela, tem certeza disso?")) {
                const res = await dbFetch.delete("/categories", {
                    data: { id, userId }
                })

                toast.success(res.data.msg)

                return getCategories()
            }

            setLoading(false)
        } catch (error) {
            toast.error("Erro, tente novamente")
            setLoading(false)
        }
    }

    const createCategory = async() => {
        setLoading(true)

        try {
            const newCategory = prompt("Nome da nova categoria")
        
            if (newCategory !== null && newCategory !== "") {
                const res = await dbFetch.post("/categories", { name: newCategory })

                toast.success(res.data.msg)

                return getCategories()
            }

            setLoading(false)
        } catch (error) {
            toast.error("Erro, tente novamente")
            setLoading(false)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <div className={styles.categories}>
                    <h1>Categorias</h1>

                    { 
                        categories.map(category => (
                            <div key={category.id}>
                                <p>{category.name}</p>

                                <div>
                                    <button 
                                        onClick={() => updateCategory(category.id)}
                                    >Atualizar</button>

                                    <button 
                                        onClick={() => deleteCategory(category.id)}
                                    >Excluir</button>
                                </div>
                            </div>
                        ))
                    }

                    <button onClick={createCategory}>Nova Categoria</button>
                </div>
            )}
        </div>
    )
}

export default Categories
