// Modules
import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import useAuth from "../hooks/useAuth"

const UserRoute = () => {
    const { userId } = useContext(UserContext)

    if (userId === 0) {
        const { authUserId, loading } = useAuth()

        if (loading) {
            return
        }
    
        if (userId === 0) {
            return <Navigate to="/login" replace />
        }

        if (authUserId !== 0) {
            return
        }
    }

    return <Outlet />
}

export default UserRoute
