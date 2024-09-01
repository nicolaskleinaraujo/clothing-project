// CSS
import styles from "./Account.module.css"

// Modules
import dbFetch from "../../config/axios"
import { UserContext } from "../../context/UserContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Loading from "../../components/Loading/Loading"

const Account = () => {
    const navigate = useNavigate()
    const { userId, setUserId, setIsAdmin } = useContext(UserContext)

    const [loading, setLoading] = useState(true)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [isGoogle, setIsGoogle] = useState(false)

    const [newPassword, setNewPassword] = useState("")

    const getUserInfos = async() => {
        setLoading(true)

        const res = await dbFetch.post("/users/id", {
            "id": userId,
            "userId": userId,
        })

        setFirstName(res.data.user.firstName)
        setLastName(res.data.user.lastName)
        setEmail(res.data.user.email)
        setIsGoogle(res.data.user.isGoogle)

        setLoading(false)
    }

    const updateInfos = async() => {
        const password = prompt("Senha atual")

        if (password !== null) {
            let data

            if (newPassword === "") {
                data = {
                    "userId": userId,
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "password": password,
                    "oldPassword": password,
                }
            } else if (newPassword !== "") {
                data = {
                    "userId": userId,
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "password": newPassword,
                    "oldPassword": password,
                }
            }

            try {
                await dbFetch.put("/users", data)

                setNewPassword("")

                toast.success("Informações atualizadas")
            } catch (error) {
                toast.error("Erro ao atualizar informações")
            }
        }
    }

    const deleteAccount = async() => {
        const password = prompt("Deletar sua conta implica no deletamento de todos os seus dados, incluindo pedidos\nDigite sua senha para deletar!")

        if (password !== null) {
            try {
                await dbFetch.delete("/users", {
                    data: {
                        "userId": userId,
                        "password": password,
                    }
                })

                setUserId(0)
                setIsAdmin(false)

                toast.success("Conta deletada com sucesso")
                navigate("/")
            } catch (error) {
                toast.error("Falha ao deletar conta")
            }
        }
    }

    useEffect(() => {
        getUserInfos()
    }, [])

    return (
        <div className={styles.account}>
            { loading ? (
                <Loading />
            ) : (
                <>
                    <h1>Sua conta</h1>

                    <label>
                        <p>Nome</p>
                        <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} readOnly={isGoogle ? true : false} />
                    </label>

                    <label>
                        <p>Sobrenome</p>
                        <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} readOnly={isGoogle ? true : false} />
                    </label>

                    <label>
                        <p>Email</p>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} readOnly={isGoogle ? true : false} />
                    </label>

                    { !isGoogle &&
                        <>
                            <label>
                                <p>Nova senha</p>
                                <input type="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                            </label>

                            <button onClick={updateInfos}>Atualizar Informações</button>
                        </>
                    }

                    <button onClick={deleteAccount}>Deletar Conta</button>
                </>
            )}
        </div>
    )
}

export default Account
