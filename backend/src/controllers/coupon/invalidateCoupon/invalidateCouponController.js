const prisma = require("../../../db/client")

const invalidateCouponController = async(req, res) => {
    const id = parseInt(req.body.id)

    if (isNaN(id)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        const coupon = await prisma.coupon.findUnique({ where: { id } })
        if (!coupon) {
            res.status(404).json({ msg: "Cupom não encontrado" })
            return
        }

        const updatedCoupon = await prisma.coupon.update({
            where: { id },
            data: { valid: !coupon.valid },
        })

        res.status(200).json({ msg: "Cupom alterado com sucesso", updatedCoupon })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = invalidateCouponController
