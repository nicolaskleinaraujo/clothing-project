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
    const [userInfos, setUserInfos] = useState({})

    const getUserInfos = async() => {
        setLoading(true)

        const res = await dbFetch.post("/users/id", {
            "id": userId,
            "userId": userId,
        })

        setUserInfos(res.data.user)
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
                    loaded
                </>
            )}
        </div>
    )
}

export default Account
