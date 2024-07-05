const prisma = require("../../../db/client")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const deleteUserController = async (req, res) => {
    const {
        id,
        password,
    } = req.body

    parseInt(id)

    if (id === "" || password === "") {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if user exists
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
        res.status(404).json({ msg: "Usuario não encontrado" })
        return
    }

    // Checking the refresh token
    const cookie = req.signedCookies.refresh
    if (!cookie) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    // Verifying the JWT
    const jwtPayload = jwt.verify(cookie, process.env.JWT_SECRET)
    if (!jwtPayload) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    // Checking if the cookie matches the request id
    if (jwtPayload.id != id) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    // Checking if the provided password matches user password
    const checkPassword = await bcrypt.compare(password, user.password) 
    if (!checkPassword) {
        res.status(401).json({ msg: "Senha incorreta" })
        return
    }

    try {
        await prisma.user.delete({
            where: { id }
        })

        res.clearCookie("access")
        res.clearCookie("refresh")

        res.status(200).json({ msg: "Usuario deletado com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

module.exports = deleteUserController
