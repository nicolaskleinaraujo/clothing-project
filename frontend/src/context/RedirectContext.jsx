// Modules
import { createContext, useState } from "react"

// Context
export const RedirectContext = createContext()

// Provider
export const RedirectProvider = ({ children }) => {
    const [redirect, setRedirect] = useState("")

    return (
        <RedirectContext.Provider value={{ redirect, setRedirect }}>
            {children}
        </RedirectContext.Provider>
    )
}
