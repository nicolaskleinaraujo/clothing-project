const jwt = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    const userId = parseInt(req.body.userId)

    // Verifying the access token
    const accessToken = req.signedCookies.access
    if (!accessToken) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    const accessJwt = jwt.verify(accessToken, process.env.JWT_SECRET)
    if (accessJwt) {
        next()
    }

    // Verifying the refresh token
    const refreshToken = req.signedCookies.refresh
    if (!refreshToken) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    const refreshJwt = jwt.verify(refreshToken, process.env.JWT_SECRET)
    if (!refreshJwt) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    // Checking if the cookie matches the user ID
    if (refreshJwt.id != userId) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    // Creating the access and refresh JWT Token
    const newAccessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" })
    const newRefreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.cookie("access", newAccessToken, {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 60 * 60 * 1000,
    })

    res.cookie("refresh", newRefreshToken, {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    next()
}

module.exports = validateToken
