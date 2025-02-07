import prisma from "../../../db/client"
import { Prisma } from "@prisma/client"
import { Request, Response } from "express"

const includeClause = {
    user: {
        include: { Address: true },
    },
    orderProducts: {
        include: { 
            product: {
                include: {
                    Images: { orderBy: { id: "asc" } }
                },
            },
            size: true,
        },
    },
} satisfies Prisma.OrdersInclude

type PrismaOrder = Prisma.OrdersGetPayload<{ include: typeof includeClause }>

interface OrderInfos extends PrismaOrder {
    orderProducts: Array<{
        product: {
            Images: Array<{
                content: Buffer | string
            }>
        }
    }>
}

const adminSortController = async(req: Request, res: Response) => {
    const paid = req.query.paid as string | undefined
    const received = req.query.received as string | undefined

    if (!paid || !received) {
        res.status(400).json({ msg: "Erro ao filtrar" })
        return
    }

    const formatedPaid = JSON.parse(paid)
    const formatedReceived = JSON.parse(received)

    try {
        let orders: OrderInfos[] = []

        if (formatedPaid === true && formatedReceived === false) {
            orders = await prisma.orders.findMany({ where: { paid: formatedPaid }, include: includeClause })
        } else if (formatedPaid === false && formatedReceived === true) {
            orders = await prisma.orders.findMany({ where: { received: formatedReceived }, include: includeClause })
        } else if (formatedPaid === false && formatedReceived === false) {
            orders = await prisma.orders.findMany({ include: includeClause })
        }

        orders.map(order => {
            order.user.password = ""
            order.user.email = ""

            const selectedAddress = order.user.Address.filter(address => address.id === order.addressId)
            order.user.Address = selectedAddress

            // Converting images to base64
            order.orderProducts.map(product => {
                (product.product.Images[0].content as Buffer | string) = product.product.Images[0].content.toString("base64")
            })
        })

        res.status(200).json({ msg: "Busca feita com sucesso", orders })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

export default adminSortController
