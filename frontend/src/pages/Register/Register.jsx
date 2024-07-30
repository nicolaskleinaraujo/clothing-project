// CSS
import styles from "./Register.module.css"

// DbFetch
import dbFetch from "../../config/axios"

// Modules
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"

const Login = () => {
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const res = await dbFetch.post("/users", {
                firstName,
                lastName,
                email,
                number,
                password, 
            })
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
                    <p>Nome</p>
                    <input type="text" onChange={(e) => setFirstName(e.target.value)} />
                </label>

                <label>
                    <p>Sobrenome</p>
                    <input type="text" onChange={(e) => setLastName(e.target.value)} />
                </label>

                <label>
                    <p>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label>
                    <p>Número de Celular</p>
                    <input type="text" onChange={(e) => setNumber(e.target.value)} />
                </label>

                <label>
                    <p>Senha</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </label>

                <input type="submit" value="Criar" />

                <p>Já tem uma conta? <Link to="/register">Entrar</Link></p>
            </form>
        </div>
    )
}

export default Login