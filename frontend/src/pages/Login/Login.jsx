// CSS
import styles from "./Login.module.css"

// DbFetch
import dbFetch from "../../config/axios"

// Modules
import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { UserContext } from "../../context/UserContext"
import { RedirectContext } from "../../context/RedirectContext"
import { LoadingContext } from "../../context/LoadingContext"
import Loading from "../../components/Loading/Loading"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"

const Login = () => {
    const navigate = useNavigate()
    const { setUserId, setIsAdmin } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)

    const { redirect, setRedirect } = useContext(RedirectContext)
    const [getRedirect, setGetRedirect] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const saveRedirect = () => {
        if (redirect !== "") {
            setGetRedirect(redirect)
            setRedirect("")
        }
    }

    const handleGoogleLogin = async(credentialResponse) => {
        setLoading(true)
        setEmail("")
        setPassword("")

        try {
            const decoded = jwtDecode(credentialResponse.credential)

            const res = await dbFetch.post("/users/login", {email: decoded.email, password, isGoogle: true})
            setUserId(res.data.user.id)
            setIsAdmin(res.data.user.isAdmin)

            toast.success(res.data.msg)

            if (getRedirect !== "") {
                navigate(getRedirect)
                return
            }

            navigate("/")
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        if (email === "" || password === "") {
            toast.info("Informe seu email e senha")
            return
        }

        try {
            const res = await dbFetch.post("/users/login", { email, password, isGoogle: false })
            setUserId(res.data.user.id)
            setIsAdmin(res.data.user.isAdmin)

            toast.success(res.data.msg)

            if (getRedirect !== "") {
                navigate(getRedirect)
                return
            }

            navigate("/")
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    useState(() => {
        saveRedirect()
    }, [])

    return (
        <div>
            { loading && <Loading /> }

            { !loading && 
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

                    <div className={styles.login_with}>
                        <p>Ou faça login com</p>

                        <GoogleLogin
                            onSuccess={credentialResponse => { handleGoogleLogin(credentialResponse) }}
                            onError={() => { toast.error("Erro, tente novamente") }}
                        />
                    </div>

                    <p>Não tem uma conta? <Link to="/register" onClick={() => setRedirect(getRedirect)}>Criar</Link></p>
                </form>
            }   
        </div>
    )
}

export default Login