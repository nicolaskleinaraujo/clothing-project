// CSS
import styles from "./Address.module.css"

// Modules
import dbFetch from "../../config/axios"
import viaCep from "../../config/viaCep"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { toast } from "react-toastify"
import { RedirectContext } from "../../context/RedirectContext"

const Address = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)

    const { redirect, setRedirect } = useContext(RedirectContext)
    const [getRedirect, setGetRedirect] = useState("")

    const [userAddress, setUserAddress] = useState({})

    const [cep, setCep] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [street, setStreet] = useState("")
    const [houseNum, setHouseNum] = useState("")

    const saveRedirect = () => {
        if (redirect !== "") {
            setGetRedirect(redirect)
            setRedirect("")
        }
    }

    const getUserinfos = async() => {
        try {
            const res = await dbFetch.post("/address/user", {
                "id": userId,
                "userId": userId,
            })
    
            setUserAddress(res.data.address)
            setCep(res.data.address.cep)
            setCity(res.data.address.city)
            setDistrict(res.data.address.district)
            setStreet(res.data.address.street)
            setHouseNum(res.data.address.houseNum)
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleChange = async(e, type) => {
        let input = e.target.value.replace(/\D/g, "")

        if (type === "CEP") {
            if (input.length > 5) {
                input = `${input.slice(0, 5)}-${input.slice(5,8)}`
                setCep(input)
            }
    
            if (input.length === 9) {
                const rawCep = input.replace(/\D/g, "")
                const res = await viaCep.get(`/${rawCep}/json/`)
                console.log(res.data)
            }

            return
        }

        setHouseNum(input)
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

            if (getRedirect !== "") {
                navigate(getRedirect)
            }
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        saveRedirect()
        getUserinfos()
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.address}>
                { Object.keys(userAddress).length === 0 ? (
                    <h1>Criar Endereço</h1>
                ) : (
                    <h1>Atualizar Endereço</h1>
                )}

                {/* TODO create cep consult */}
                <label>
                    <p>CEP</p>
                    <input 
                        type="text" 
                        name="cep" 
                        id="cep" 
                        value={cep} 
                        required
                        onChange={(e) => handleChange(e, "CEP")} 
                    />
                </label>

                <label>
                    <p>Cidade</p>
                    <input 
                        type="text" 
                        name="city" 
                        id="city" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>

                <label>
                    <p>Bairro</p>
                    <input 
                        type="text" 
                        name="district" 
                        id="district" 
                        value={district} 
                        onChange={(e) => setDistrict(e.target.value)}
                    />
                </label>

                <label>
                    <p>Rua</p>
                    <input 
                        type="text" 
                        name="street" 
                        id="street" 
                        value={street} 
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </label>

                {/* TODO update button layout */}
                <label>
                    <p>Número</p>
                    <input 
                        type="text" 
                        name="housenum" 
                        id="housenum" 
                        value={houseNum} 
                        onChange={(e) => handleChange(e)}
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
