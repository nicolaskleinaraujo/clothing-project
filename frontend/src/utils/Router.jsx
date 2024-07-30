// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Components
import Navbar from "../components/Navbar/Navbar"

// Pages
import User from "../pages/User/User"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/user" element={<User />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
