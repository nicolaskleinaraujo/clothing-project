const removeProductController = async(req, res) => {
    const cart = req.signedCookies.cart
    const id = parseInt(req.body.id)

    if (!cart || isNaN(id)) {
        res.status(400).json({ msg: "Infomações insuficientes" })
        return
    }

    try {
        const updatedCart = cart.filter(item => item.productId !== id)

        res.cookie("cart", updatedCart, {
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
