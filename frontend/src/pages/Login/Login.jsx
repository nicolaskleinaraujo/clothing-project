// CSS
import styles from "./Login.module.css"

// DbFetch
import dbFetch from "../../config/axios"

// Modules
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const res = await dbFetch.post("/users/login", { email, password })

            if (res.status === 200) {
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit}>
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

            <img src="/cabin-photo.png" alt="Imagem Roupa" />
        </div>
    )
}

export default Login