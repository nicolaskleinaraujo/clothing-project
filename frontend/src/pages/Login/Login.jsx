// CSS
import styles from "./Login.module.css"

// DbFetch
import dbFetch from "../../config/axios"

// Modules
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const res = await dbFetch.post("/users/login", { email, password })
            toast.success(res.data.msg)
            navigate("/")
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.login}>
                <label>
                    <p>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label>
                    <p>Senha</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </label>

                <input type="submit" value="Login" />

                <p>Não tem uma conta? <Link to="/register">Criar</Link></p>
            </form>
        </div>
    )
}

export default Login