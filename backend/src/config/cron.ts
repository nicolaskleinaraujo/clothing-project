import prisma from "../db/client"
import dayjs from "dayjs"

const deleteExpiredOrders = async() => {
    try {
        // Takes the current time and removes 5 minutes
        const cutOffTime = dayjs().subtract(11, "minutes").toDate()

        // Deletes all products from unpaid orders created more than 5 minutes ago
        await prisma.orderProduct.deleteMany({
            where: {
                order: {
                    paid: false,
                    created_at: {
                        lt: cutOffTime
                    },
                },
            },
        })

        // Deletes all unpaid orders created more than 5 minutes ago
        await prisma.orders.deleteMany({
            where: {
                paid: false,
                created_at: {
                    lt: cutOffTime
                },
            },
        })
    } catch (error) {
        console.log(error)
    }
}

export default deleteExpiredOrders
