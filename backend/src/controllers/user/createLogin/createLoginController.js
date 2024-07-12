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

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.cookie("access", accessToken, {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 60 * 60 * 1000,
    })

    res.cookie("refresh", refreshToken, {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json({ msg: "Login feito com sucesso", user })
}

module.exports = createLoginController
