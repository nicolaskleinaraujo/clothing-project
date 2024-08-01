const prisma = require("../../../db/client")
const jwt = require("jsonwebtoken")

const tryAuthController = async(req, res) => {
    const refreshToken = req.signedCookies.refresh

    if (!refreshToken) {
        res.status(400).json({ msg: "Falha ao tentar autenticação" })
        return
    }

    try {
        const refreshJwt = jwt.verify(refreshToken, process.env.JWT_SECRET)

        // Getting user from ID inside token
        const user = await prisma.user.findUnique({ where: { id: refreshJwt.id } })

        // Creating the access and refresh JWT Token
        const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.cookie("access", newAccessToken, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 60 * 60 * 1000,
        })

        res.status(200).json({ msg: "Logado com sucesso", user })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = tryAuthController
