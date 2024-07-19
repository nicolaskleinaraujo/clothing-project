const addProductController = async(req, res) => {
    const { productId, sizeId, quantity } = req.body
    let cart = req.signedCookies.cart

    if (cart) {
        cart += { productId, sizeId, quantity }
    } else if (!cart) {
        cart = [ { productId, sizeId, quantity } ]
    }
}

module.exports = addProductController
