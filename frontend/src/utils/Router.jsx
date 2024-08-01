// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Components
import Navbar from "../components/Navbar/Navbar"

// Pages
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import Home from "../pages/Home/Home"
import Product from "../pages/Product/Product"
import Cart from "../pages/Cart/Cart"
import Order from "../pages/Order/Order"
import Orders from "../pages/Orders/Orders"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/register" element={ <Register /> } />
                    <Route path="/" element={ <Home /> } />
                    <Route path="/product/:slug" element={ <Product /> } />
                    <Route path="/cart" element={ <Cart /> } />
                    <Route path="/order/:id" element={ <Order /> } />
                    <Route path="/orders/:id" element={ <Orders /> } />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
