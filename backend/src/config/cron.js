const prisma = require("../db/client")
const dayjs = require("dayjs")

const deleteExpiredOrders = async() => {
    try {
        // Takes the current time and removes 5 minutes
        const cutOffTime = dayjs().subtract(5, "minutes").toDate()

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

module.exports = deleteExpiredOrders
