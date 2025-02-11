import prisma from "../../../db/client"
import createPayment from "../../../config/processPayment"
import { Request, Response } from "express"

const cardPayment = async(req: Request, res: Response) => {
    const id: number = req.body.orderId

    try {
        const orderExists = await prisma.orders.findUnique({ where: { id: Number(id) } })
        if (!orderExists) {
            res.status(404).json({ msg: "Pedido não encontrado" })
            return
        }

        const process = await createPayment(req.body.formData)

        if (process.status === "rejected") {
            res.status(400).json({ msg: "Pagamento rejeitado, tente novamente" })
            return
        }

        const order = await prisma.orders.update({
            where: { id: Number(id) },
            data: {
                paid: true,
                payment_reference: String(process.id),
            },
        })

        res.status(200).json({ msg: "Pagamento efetuado com sucesso", order })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default cardPayment
