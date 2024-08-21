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
import CreateOrder from "../pages/CreateOrder/CreateOrder"
import SortProducts from "../pages/SortProducts/SortProducts"
import UserMenu from "../pages/UserMenu/UserMenu"
import AddressMenu from "../pages/AddressMenu/AddressMenu"

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
                    <Route path="/sort-products/:filter" element={ <SortProducts /> } />

                    <Route element={ <UserRoute /> }>
                        <Route path="/cart" element={ <Cart /> } />
                        <Route path="/order/:id" element={ <Order /> } />
                        <Route path="/orders/:id" element={ <Orders /> } />
                        <Route path="/address/:id?" element={ <Address /> } />
                        <Route path="/create-order" element={ <CreateOrder /> } />
                        <Route path="/menu" element={ <UserMenu /> } />
                        <Route path="/address-menu" element={ <AddressMenu /> } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
