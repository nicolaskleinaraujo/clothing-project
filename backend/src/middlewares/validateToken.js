const jwt = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    const userId = parseInt(req.body.userId)

    // Verifying the access token
    const accessToken = req.signedCookies.access
    if (!accessToken) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return
        }

        if (decoded.id != userId) {
            res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
            return
        }

        next()
    })

    // Verifying the refresh token
    const refreshToken = req.signedCookies.refresh
    if (!refreshToken) {
        res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
        return
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
            return
        }

        if (decoded.id != userId) {
            res.status(401).json({ msg: "Sessão expirada, faça o login novamente" })
            return
        }
    })

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
