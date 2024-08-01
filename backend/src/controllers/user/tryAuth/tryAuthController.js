const prisma = require("../../../db/client")
const jwt = require("jsonwebtoken")

const tryAuthController = async(req, res) => {
    const accessToken = req.signedCookies.access
    const refreshToken = req.signedCookies.refresh

    if (!accessToken || !refreshToken) {
        res.status(400).json({ msg: "Falha ao tentar autenticação" })
        return
    }

    try {
        jwt.verify(accessToken, process.env.JWT_SECRET, (err) => {
            if (err.name !== 'TokenExpiredError') {
                res.status(400).json({ msg: "Falha ao tentar autenticação" })
                return
            }
        })

        jwt.verify(refreshToken, process.env.JWT_SECRET, (err) => {
            if (err) {
                res.status(400).json({ msg: "Falha ao tentar autenticação" })
                return
            }
        })

        // Getting user from ID inside token
        const user = await prisma.user.findUnique({ where: { id: refreshToken.id } })

        // Creating the access and refresh JWT Token
        const newAccessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" })

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
