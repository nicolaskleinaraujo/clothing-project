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
        isGoogle,
    } = req.body

    if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        number === "" ||
        (!isGoogle && password === "")
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

    try {
        let user
        if (!isGoogle) {
            // Hashing the password
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            user = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    number,
                    password: hash,
                    isGoogle,
                },
            })
        } else if (isGoogle) {
            user = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    number,
                    isGoogle,
                }
            })
        }

        // Creating the access and refresh JWT Token
        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("access", accessToken, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 60 * 60 * 1000,
        })

        res.cookie("refresh", refreshToken, {
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.status(200).json({ msg: "Usuario criado com sucesso", user })
    } catch (error) {
        res.status(500).json({ msg: "Erro interno, tente novamente", error })
    }
}

module.exports = createUserController