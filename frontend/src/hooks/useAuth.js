// Modules
import dbFetch from "../config/axios"
import { useEffect, useState, useContext } from 'react'
import { UserContext } from "../context/UserContext"
import { LoadingContext } from "../context/LoadingContext"

const useAuth = () => {
    const { setUserId, setIsAdmin } = useContext(UserContext)

    const {loading, setLoading} = useContext(LoadingContext)

    const [authUserId, setAuthUserId] = useState(0)
    const [authIsAdmin, setAuthIsAdmin] = useState(false)

    const fetchData = async() => {
        try {
            const res = await dbFetch.post("/users/tryauth")

            setAuthUserId(res.data.user.id)
            setAuthIsAdmin(res.data.user.isAdmin)
    
            setUserId(res.data.user.id)
            setIsAdmin(res.data.user.isAdmin)
    
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { authUserId, authIsAdmin, loading }
}

export default useAuth
