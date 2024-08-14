const removeAuthController = async(req, res) => {
    try {
        res.clearCookie("access")
        res.clearCookie("refresh")

        res.status(200).json({ msg: "Usuario saiu com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

module.exports = removeAuthController
