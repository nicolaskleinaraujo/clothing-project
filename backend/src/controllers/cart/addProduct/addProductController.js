const addProductController = async(req, res) => {
    const { productId, sizeId, quantity } = req.body
    let cart = req.signedCookies.cart

    if (cart) {
        cart += { productId, sizeId, quantity }
    } else if (!cart) {
        cart = [ { productId, sizeId, quantity } ]
    }

    try {
        res.cookie("cart", cart, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
        })
    
        res.status(200).json({ msg: "Produto adicionado com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

module.exports = addProductController
