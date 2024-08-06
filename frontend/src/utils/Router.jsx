// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserRoute from "./UserRoute"

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
import Address from "../pages/Address/Address"

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

                    <Route element={ <UserRoute /> }>
                        <Route path="/cart" element={ <Cart /> } />
                        <Route path="/order/:id" element={ <Order /> } />
                        <Route path="/orders/:id" element={ <Orders /> } />
                        <Route path="/address" element={ <Address /> } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
