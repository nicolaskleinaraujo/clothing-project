const prisma = require("../../../db/client")

const deleteOrderController = async(req, res) => {
    const { id } = req.body

    if (isNaN(id)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }
}

module.exports = deleteOrderController
