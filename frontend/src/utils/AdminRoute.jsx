// Modules
import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { toast } from "react-toastify"
import useAuth from "../hooks/useAuth"

const AdminRoute = () => {
    const { userId, isAdmin } = useContext(UserContext)

    if (!isAdmin && userId !== 0) {
        toast.error("Usuario não autorizado")
        return <Navigate to="/" replace />
    }

    if (userId === 0) {
        const { authUserId, authIsAdmin, authLoading } = useAuth()

        if (authLoading) {
            return
        }
    
        if (authUserId === 0) {
            return <Navigate to="/login" replace />
        }

        if (!authIsAdmin) {
            toast.error("Usuario não autorizado")
            return <Navigate to="/" replace />
        }

        return
    }

    return <Outlet />
}

export default AdminRoute
