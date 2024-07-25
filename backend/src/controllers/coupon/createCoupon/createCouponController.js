const prisma = require("../../../db/client")

const createCouponController = async(req, res) => {
    const code = req.body.code

    if (code === "") {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        const codeAlreadyExists = prisma.coupon.
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = createCouponController
