// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Components
import Navbar from "../components/Navbar/Navbar"

// Pages
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
