const prisma = require("../../../db/client")

const execute = async(body) => {
    const emailExists = prisma.user.findUnique({ where: { email: body.email } })
    if (emailExists) {
        
    }
}