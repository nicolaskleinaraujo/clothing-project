// Modules
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const UserRoute = () => {
    const { userId, setUserId } = useContext(UserContext)

    if (userId === 0) {
        const tryAuth = useAuth()
        setUserId(tryAuth.userId)
    }

    return userId != 0 ? <Outlet /> : <Navigate to="/" />
}

export default UserRoute
