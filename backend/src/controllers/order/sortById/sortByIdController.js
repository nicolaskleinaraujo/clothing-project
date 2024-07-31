const prisma = require("../../../db/client")

const sortById = async(req, res) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    try {
        const order = await prisma.orders.findUnique({
            where: { id },
            include: { user },
        })

        res.status(200).json({ msg: "Pesquisa feita com sucesso", order })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente" })
    }
}

module.exports = sortById
