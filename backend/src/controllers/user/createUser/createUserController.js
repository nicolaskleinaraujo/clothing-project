const prisma = require("../../../db/client")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createUserController = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        number,
        password,
        cep,
        city,
        district,
        street,
        houseNum,
    } = req.body

    parseInt(houseNum)

    if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        number === "" ||
        password === "" ||
        cep === "" ||
        city === "" ||
        district === "" ||
        street === "" ||
        houseNum === undefined
    ) {
        res.status(400).json({ msg: "Informações insuficientes" })
        return
    }

    // Checking if email or number is already cadastered
    const emailExists = await prisma.user.findUnique({ where: { email } })
    const numberExists = await prisma.user.findUnique({ where: { number } })

    if (emailExists || numberExists) {
        res.status(400).json({ msg: "Email ou numero de telefone já cadastrado" })
        return
    }

    // Hashing the password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    try {
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                number,
                password: hash,
                cep,
                city,
                district,
                street,
                houseNum,
            },
        })

        // Creating the access and refresh JWT Token
        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.status(200).json({ msg: "Usuario criado com sucesso", user })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = createUserController