const prisma = require("../../../db/client")

const adminSortController = async(req, res) => {
    const { paid, received } = req.query

    const formatedPaid = JSON.parse(paid)
    const formatedReceived = JSON.parse(received)

    let orders = {}

    const includeClause = {
        user: {
            include: { Address: true },
        },
        orderProducts: {
            include: { 
                product: true,
                size: true,
            },
        },
    }

    try {
        if (formatedPaid === true && formatedReceived === false) {
            orders = await prisma.orders.findMany({ where: { paid: formatedPaid }, include: includeClause })
        } else if (formatedPaid === false && formatedReceived === true) {
            orders = await prisma.orders.findMany({ where: { received: formatedReceived }, include: includeClause })
        } else if (formatedPaid === false && formatedReceived === false) {
            orders = await prisma.orders.findMany({ include: includeClause })
        }

        orders.map(order => {
            delete order.user.password
            delete order.user.email
            delete order.user.isGoogle

            const selectedAddress = order.user.Address.filter(address => address.id === order.addressId)
            order.user.Address = selectedAddress
        })

        res.status(200).json({ msg: "Busca feita com sucesso", orders })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = adminSortController