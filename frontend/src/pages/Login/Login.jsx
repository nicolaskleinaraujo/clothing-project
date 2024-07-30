// CSS
import styles from "./Login.module.css"

// DbFetch
import dbFetch from "../../config/axios"

// Modules
import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        const res = await dbFetch.post("/users/login", { email, password })
        console.log(res)
    }

    return (
        <div className={styles.login}>
            <img src="https://via.placeholder.com/462x200" alt="Imagem Roupa" />

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

                <p>Não tem uma conta? <a href="/register">Criar</a></p>
            </form>
        </div>
    )
}

export default Login