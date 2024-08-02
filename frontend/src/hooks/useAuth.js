// Modules
import dbFetch from "../config/axios"
import { useEffect, useState } from 'react'

const useAuth = () => {
    const [userId, setUserId] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchData = async() => {
        const res = await dbFetch.post("/users/tryauth")

        setIsAdmin(res.data.user.isAdmin)
        setUserId(res.data.user.id)

        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { userId, isAdmin, loading }
}

export default useAuth
