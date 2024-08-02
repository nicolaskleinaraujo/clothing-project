// Modules
import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const UserRoute = () => {
    const { userId, loading } = useAuth()

    if (loading) {
        return
    }

    if (userId === 0) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default UserRoute
