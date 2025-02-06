// Imports
import express, { Request, Response, Application } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "node:path"
import cron from "node-cron"
import deleteExpiredOrders from "./config/cron"
const app: Application = express()

// Routers
import usersRouter from "./routes/users"
import addressRouter from "./routes/address"
import productsRouter from "./routes/products"
import categoriesController from "./routes/categories"
const orders = require("./routes/orders")
const cart = require("./routes/cart")
const coupons = require("./routes/coupons")

// Configs
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET))
app.use(express.json())
app.use(
    cors({
        origin: process.env.ORIGIN_URL,
        credentials: true,
    })
)
cron.schedule("* * * * *", deleteExpiredOrders)

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Bem-vindo a minha API, para mais informações, confira o repositório do projeto")
})
app.use("/images", express.static(path.resolve("product_images")))
app.use("/users", usersRouter)
app.use("/address", addressRouter)
app.use("/products", productsRouter)
app.use("/categories", categoriesController)
app.use("/orders", orders)
app.use("/cart", cart)
app.use("/coupons", coupons)

export default app
