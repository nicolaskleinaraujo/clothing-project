// Modules
import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import useAuth from "../hooks/useAuth"

const UserRoute = () => {
    const { userId } = useContext(UserContext)

    if (userId === 0) {
        const { authUserId, authLoading } = useAuth()

        if (authLoading) {
            return
        }
    
        if (authUserId === 0) {
            return <Navigate to="/login" replace />
        } else if (authUserId !== 0) {
            return
        }
    }

    return <Outlet />
}

export default UserRoute
