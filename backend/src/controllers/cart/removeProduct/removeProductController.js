const removeProductController = async(req, res) => {
    const cart = req.signedCookies.cart
    const index = parseInt(req.body.index)

    if (!cart || isNaN(index)) {
        res.status(400).json({ msg: "Infomações insuficientes" })
        return
    }

    try {
        cart.splice(index, 1)

        res.cookie("cart", cart, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
        })
        res.status(200).json({ msg: "Produto removido do carrinho" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

module.exports = removeProductController
