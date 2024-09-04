const prisma = require("../../../db/client")

const adminSortController = async(req, res) => {
    const { paid, received } = req.query

    const formatedPaid = JSON.parse(paid)
    const formatedReceived = JSON.parse(received)

    try {
        let orders = {}

        if (formatedPaid === true && formatedReceived === false) {
            orders = await prisma.orders.findMany({ where: { paid: formatedPaid } })
        } else if (formatedPaid === false && formatedReceived === false) {
            orders = await prisma.orders.findMany({ where: { received: formatedReceived } })
        } else if (formatedPaid === false && received === false) {
            orders = await prisma.orders.findMany()
        }

        res.status(200).json({ msg: "Busca feita com sucesso", orders })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

module.exports = adminSortController
