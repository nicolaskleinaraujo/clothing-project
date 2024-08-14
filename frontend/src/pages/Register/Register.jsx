// CSS
import styles from "./Register.module.css"

// DbFetch
import dbFetch from "../../config/axios"

// Modules
import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { UserContext } from "../../context/UserContext"
import { RedirectContext } from "../../context/RedirectContext"

const Register = () => {
    const navigate = useNavigate()
    const { setUserId } = useContext(UserContext)

    const { redirect, setRedirect } = useContext(RedirectContext)
    const [getRedirect, setGetRedirect] = useState("")

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [password, setPassword] = useState("")

    const saveRedirect = () => {
        if (redirect !== "") {
            setGetRedirect(redirect)
            setRedirect("")
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            number === "" ||
            password === ""
        ) { return toast.info("Informe suas credenciais") }

        try {
            const res = await dbFetch.post("/users", {
                firstName,
                lastName,
                email,
                number,
                password, 
            })
            setUserId(res.data.user.id)

            toast.success(res.data.msg)

            if (getRedirect !== "") {
                navigate(getRedirect)
                return
            }

            navigate("/")
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    useState(() => {
        saveRedirect()
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.register}>
                <h1>Criar Conta</h1>

                <label>
                    <p>Nome</p>
                    <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                </label>

                <label>
                    <p>Sobrenome</p>
                    <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                </label>

                <label>
                    <p>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </label>

                <label>
                    <p>Número de Celular</p>
                    <input type="text" onChange={(e) => setNumber(e.target.value)} value={number} />
                </label>

                <label>
                    <p>Senha</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </label>

                <input type="submit" value="Criar" />

                <p>Já tem uma conta? <Link to="/login" onClick={() => setRedirect(getRedirect)}>Entrar</Link></p>
            </form>
        </div>
    )
}

export default Register