// Modules
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { RedirectContext } from "../context/RedirectContext"
import useAuth from "../hooks/useAuth"

const UserRoute = () => {
    const location = useLocation()

    const { userId } = useContext(UserContext)
    const { setRedirect } = useContext(RedirectContext)

    if (userId === 0) {
        const { authUserId, authLoading } = useAuth()

        if (authLoading) {
            return
        }
    
        if (authUserId === 0) {
            setRedirect(location.pathname)
            return <Navigate to="/login" replace />
        } else if (authUserId !== 0) {
            return
        }
    }

    return <Outlet />
}

export default UserRoute
