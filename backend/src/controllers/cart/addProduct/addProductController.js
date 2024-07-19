const prisma = require("../../../db/client")

const addProductController = async(req, res) => {
    const { productId, sizeId, quantity } = req.body
    let cart = req.signedCookies.cart

    // Validates all the necessary info of the informed product
    const product = await prisma.products.findUnique({ where: { id: productId }, include: { sizes: true } })
    if (!product) {
        res.status(400).json({ msg: "Erro ao processar carrinho, tente novamente" })
        return
    }

    if (!product.avaiable) {
        res.status(400).json({ msg: "O produto não esta mais disponivel" })
        return
    }

    if (product.quantity < quantity) {
        res.status(400).json({ msg: "Erro ao processar carrinho, tente novamente" })
        return
    }

    const sizeAvaiable = product.sizes.some(size => size.id === sizeId)
    if (!sizeAvaiable) {
        res.status(400).json({ msg: "Erro ao processar carrinho, tente novamente" })
        return
    }

    // Initializes a empty array if cart does not exists
    if (!cart) {
        cart = []
    }

    cart.push({ productId, sizeId, quantity })

    try {
        res.cookie("cart", cart, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
        })
    
        res.status(200).json({ msg: "Produto adicionado com sucesso", cart })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

module.exports = addProductController