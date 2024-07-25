const prisma = require("../../../db/client")

const createCouponController = async(req, res) => {
    const { code, percentage, quantity } = req.body

    if (code === "" || percentage == "" || isNaN(quantity)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        const couponAlreadyExists = await prisma.coupon.findUnique({ where: { code } })
        if (couponAlreadyExists) {
            res.status(400).json({ msg: "Nome de cupom já cadastrado" })
            return
        }

        const coupon = await prisma.coupon.create({ 
            data: { 
                code, 
                percentage, 
                quantity: parseInt(quantity) 
            } 
        })

        res.status(201).json({ msg: "Cupom criado com sucesso", coupon })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = createCouponController
