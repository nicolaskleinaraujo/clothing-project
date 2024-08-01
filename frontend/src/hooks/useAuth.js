// Modules
import dbFetch from "../config/axios"
import { useEffect, useState } from 'react'

export const useAuth = () => {
    const [userId, setUserId] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)

    const fetchData = async() => {
        const res = await dbFetch.post("/users/tryauth")

        setIsAdmin(res.data.user.isAdmin)
        setUserId(res.data.user.id)
    }

    useEffect(() => {
        fetchData()
    })

    return { userId, isAdmin }
}