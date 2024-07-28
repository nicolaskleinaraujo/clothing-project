// Imports
const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const path = require("node:path")
const cron = require("node-cron")
const deleteExpiredOrders = require("./config/cron")

// Routers
const users = require("./routes/users")
const address = require("./routes/address")
const products = require("./routes/products")
const categories = require("./routes/categories")
const orders = require("./routes/orders")
const cart = require("./routes/cart")
const coupons = require("./routes/coupons")

// Configs
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET))
app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)
cron.schedule("* * * * *", deleteExpiredOrders)

// Routes
app.get("/", (req, res) => {
    res.send("Bem-vindo a minha API, para mais informações, confira o repositório do projeto")
})
app.use("/images", express.static(path.resolve("product_images")))
app.use("/users", users)
app.use("/address", address)
app.use("/products", products)
app.use("/categories", categories)
app.use("/orders", orders)
app.use("/cart", cart)
app.use("/coupons", coupons)

app.post("/not", (req, res) => {
    console.log(req.body.payment_id)
    console.log(req.body.status)
    console.log(req.query)
    res.status(200).json({ req })
})

module.exports = app
