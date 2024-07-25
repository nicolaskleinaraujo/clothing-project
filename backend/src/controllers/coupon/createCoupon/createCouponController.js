const prisma = require("../../../db/client")

const createCouponController = async(req, res) => {
    const code = req.body.code

    if (code === "") {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }
}

module.exports = createCouponController
