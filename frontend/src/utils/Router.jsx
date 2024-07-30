// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Components
import Navbar from "../components/Navbar/Navbar"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        </>
    )
}

export default Router
