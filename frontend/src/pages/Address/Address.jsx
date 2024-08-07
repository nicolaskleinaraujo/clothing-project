// CSS
import styles from "./Address.module.css"

// Modules
import dbFetch from "../../config/axios"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../context/UserContext"

const Address = () => {
    const { userId } = useContext(UserContext)

    const [userAddress, setUserAddress] = useState({})

    const getUserinfos = async() => {
        const res = await dbFetch.post("/address/user", {
            "id": userId,
            "userId": userId,
        })

        setUserAddress(res.data.address)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
    }

    useEffect(() => {
        getUserinfos()
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.address}>
                { Object.keys(userAddress).length === 0 ? (
                    <h1>Criar Endereço</h1>
                ) : (
                    <h1>Endereço</h1>
                )}

                <label>
                    <p>CEP</p>
                    <input type="text" name="cep" id="cep" value={userAddress.cep} />
                </label>

                <label>
                    <p>Cidade</p>
                    <input type="text" name="city" id="city" value={userAddress.city} />
                </label>

                <label>
                    <p>Bairro</p>
                    <input type="text" name="district" id="district" value={userAddress.district} />
                </label>

                <label>
                    <p>Rua</p>
                    <input type="text" name="street" id="street" value={userAddress.street} />
                </label>

                <label>
                    <p>Número</p>
                    <input type="text" name="housenum" id="housenum" value={userAddress.houseNum} />
                </label>

                { Object.keys(userAddress).length === 0 ? (
                    <input type="submit" value="Cadastrar" />
                ) : (
                    <input type="submit" value="Atualizar" />
                )}
            </form>
        </div>
    )
}

export default Address
