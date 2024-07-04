const handle = async(req, res) => {
    const user = await createUserUseCase(req.body)

    if (user.status !== 201) {
        res.status(user.status).json({ msg: user.msg })
    }

    res.status(200).json({ msg: "Usuario criado com sucesso", user })
}