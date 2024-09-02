const prisma = require("../../../db/client")

const getAllCouponsController = async(req, res) => {
    try {
        const coupons = await prisma.coupon.findMany()

        res.status(200).json({ msg: "Busca feita com sucesso", coupons })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

module.exports = getAllCouponsController
