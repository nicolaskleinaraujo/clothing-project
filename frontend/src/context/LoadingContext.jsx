// Modules
import { createContext, useState } from "react"

// Context
export const LoadingContext = createContext()

// Provider
export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}
