// Imports
const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const path = require("node:path")

const users = require("./routes/users")
const address = require("./routes/address")
const products = require("./routes/products")
const categories = require("./routes/categories")
const orders = require("./routes/orders")

// Configs
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET))
app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)

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

module.exports = app
