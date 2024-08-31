// CSS
import styles from "./Account.module.css"

// Modules
import dbFetch from "../../config/axios"
import { UserContext } from "../../context/UserContext"
import { useContext, useEffect, useState } from "react"
import Loading from "../../components/Loading/Loading"

const Account = () => {
    const { userId, setUserId, setIsAdmin } = useContext(UserContext)

    const [loading, setLoading] = useState(true)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
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

        setLoading(false)
    }

    useEffect(() => {
        getUserInfos()
    }, [])

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <>
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
                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </label>

                    <label>
                        <p>Nova senha</p>
                        <input type="text" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                    </label>

                    <button>Atualizar Informações</button>

                    <button>Deletar Conta</button>
                </>
            )}
        </div>
    )
}

export default Account
