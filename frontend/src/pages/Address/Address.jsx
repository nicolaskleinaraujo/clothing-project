// CSS
import styles from "./Address.module.css"

// Modules
import dbFetch from "../../config/axios"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { toast } from "react-toastify"

const Address = () => {
    const { userId } = useContext(UserContext)

    const [userAddress, setUserAddress] = useState({})

    const [cep, setCep] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [street, setStreet] = useState("")
    const [houseNum, setHouseNum] = useState("")

    const getUserinfos = async() => {
        const res = await dbFetch.post("/address/user", {
            "id": userId,
            "userId": userId,
        })

        setUserAddress(res.data.address)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            let res

            if (Object.keys(userAddress).length === 0) {
                res = await dbFetch.post("/address", {
                    "cep": cep,
                    "city": city,
                    "district": district,
                    "street": street,
                    "houseNum": houseNum,
                    "userId": userId,
                })                
            } else {
                res = await dbFetch.put("/address", {
                    "id": userAddress.id,
                    "cep": cep,
                    "city": city,
                    "district": district,
                    "street": street,
                    "houseNum": houseNum,
                    "userId": userId,
                })
            }

            toast.success(res.data.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
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
                    <input 
                        type="text" 
                        name="cep" 
                        id="cep" 
                        value={userAddress.cep} 
                        onChange={(e) => setCep(e.target.value)} 
                    />
                </label>

                <label>
                    <p>Cidade</p>
                    <input 
                        type="text" 
                        name="city" 
                        id="city" 
                        value={userAddress.city} 
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>

                <label>
                    <p>Bairro</p>
                    <input 
                        type="text" 
                        name="district" 
                        id="district" 
                        value={userAddress.district} 
                        onChange={(e) => setDistrict(e.target.value)}
                    />
                </label>

                <label>
                    <p>Rua</p>
                    <input 
                        type="text" 
                        name="street" 
                        id="street" 
                        value={userAddress.street} 
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </label>

                <label>
                    <p>Número</p>
                    <input 
                        type="text" 
                        name="housenum" 
                        id="housenum" 
                        value={userAddress.houseNum} 
                        onChange={(e) => setHouseNum(e.target.value)}
                    />
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
