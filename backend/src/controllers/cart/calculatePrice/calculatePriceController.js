const calculatePriceController = async(req, res) => {
    const cart = req.signedCookies.cart

    if (!cart) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }
}

module.exports = calculatePriceController
