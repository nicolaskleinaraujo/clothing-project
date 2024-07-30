// Modules
import { createContext, useState } from "react"

// Context
export const UserContext = createContext()

// Provider
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <UserContext.Provider value={{ userId, setUserId, isAdmin, setIsAdmin }}>
            {children}
        </UserContext.Provider>
    )
}
