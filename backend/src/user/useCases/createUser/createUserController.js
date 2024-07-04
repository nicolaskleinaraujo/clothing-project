const handle = async(req, res) => {
    const user = await createUserUseCase(req.body)

    res.status(200).json({ msg: "Usuario criado com sucesso", user })
}