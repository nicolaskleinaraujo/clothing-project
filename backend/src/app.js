const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("Bem-vindo a minha API, para mais informações, confira o repositório do projeto")
})

module.exports = app
