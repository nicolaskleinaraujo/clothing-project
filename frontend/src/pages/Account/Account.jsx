// CSS
import styles from "./Account.module.css"

// Modules
import dbFetch from "../../config/axios"
import { UserContext } from "../../context/UserContext"
import { useContext, useEffect } from "react"

const Account = () => {
    const { userId, setUserId, setIsAdmin } = useContext(UserContext)

    const getUserInfos = async() => {
        console.log("gotten")
    }

    useEffect(() => {
        getUserInfos()
    }, [])

    return (
        <div>
            account
        </div>
    )
}

export default Account
