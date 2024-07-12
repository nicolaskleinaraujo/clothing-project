const prisma = require("../../../db/client")
const bcrypt = require("bcryptjs")

const createLoginController = async (req, res) => {
    const { email, password } = req.body

    if (email === "" || password === "") {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        res.status(404).json({ msg: "Email ou senha incorretos" })
        return
    }

    const testPassword = bcrypt.compareSync(password, user.password)

    if (!testPassword) {
        res.status(400).json({ msg: "Email ou senha incorretos" })
        return
    }
}

module.exports = createLoginController
