// CSS
import styles from "./Login.module.css"

// DbFetch
import dbFetch from "../../config/axios"

// Modules
import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { UserContext } from "../../context/UserContext"

const Login = () => {
    const navigate = useNavigate()
    const { setUserId, setIsAdmin } = useContext(UserContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (email === "" || password === "") {
            toast.info("Informe seu email e senha")
            return
        }

        try {
            const res = await dbFetch.post("/users/login", { email, password })
            setUserId(res.data.user.id)
            setIsAdmin(res.data.user.isAdmin)

            toast.success(res.data.msg)
            navigate("/")
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.login}>
                <h1>Login</h1>

                <label>
                    <p>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </label>

                <label>
                    <p>Senha</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </label>

                <input type="submit" value="Login" />

                <p>Não tem uma conta? <Link to="/register">Criar</Link></p>
            </form>
        </div>
    )
}

export default Login