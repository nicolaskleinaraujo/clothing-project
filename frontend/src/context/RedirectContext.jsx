// Modules
import { createContext, useState } from "react"

// Context
export const RedirectContext = createContext()

// Provider
export const RedirectProvider = ({ children }) => {
    const [Redirect, setRedirect] = useState("")

    return (
        <RedirectContext.Provider value={{ Redirect, setRedirect }}>
            {children}
        </RedirectContext.Provider>
    )
}
