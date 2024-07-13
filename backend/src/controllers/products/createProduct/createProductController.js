const prisma = require("../../../db/client")

const createProductController = async (req, res) => {
    const {
        name,
        price,
        sizes,
        colors,
        quantity,
    } = req.body

    const imageName = req.file.filename

    parseInt(quantity)
    parseFloat(price)

    if (
        name === "" ||
        isNaN(price) ||
        sizes === "" ||
        colors === "" ||
        isNaN(quantity)
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }
}

module.exports = createProductController
