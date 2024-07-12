const jwt = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    const userId = parseInt(req.body.userId)

    if (userId === undefined) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Verifying the access token
    const accessToken = req.signedCookies.access
    if (!accessToken) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    try {
        const accessJwt = jwt.verify(accessToken, process.env.JWT_SECRET)

        if (accessJwt.id != userId) {
            res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
            return
        }
    } catch { return }

    // Verifying the refresh token
    const refreshToken = req.signedCookies.refresh
    if (!refreshToken) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    try {
        const refreshJwt = jwt.verify(refreshToken, process.env.JWT_SECRET)

        if (refreshJwt.id != userId) {
            res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
            return
        }
    } catch (error) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    // Creating the access and refresh JWT Token
    const newAccessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.cookie("access", newAccessToken, {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 60 * 60 * 1000,
    })

    next()
}

module.exports = validateToken
