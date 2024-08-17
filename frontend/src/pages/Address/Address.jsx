// CSS
import styles from "./Address.module.css"

// Modules
import dbFetch from "../../config/axios"
import viaCep from "../../config/viaCep"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { LoadingContext } from "../../context/LoadingContext"
import { toast } from "react-toastify"
import { RedirectContext } from "../../context/RedirectContext"
import Loading from "../../components/Loading/Loading"

const Address = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)

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

            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const handleChange = async(e, type) => {
        let input = e.target.value.replace(/[\s()\-]/g, "")

        if (type === "CEP") {
            if (input.length > 5) {
                input = `${input.slice(0, 5)}-${input.slice(5,8)}`
            }
    
            if (input.length === 9) {
                setLoading(true)

                const rawCep = input.replace(/[\s()\-]/g, "")
                const res = await viaCep.get(`/${rawCep}/json/`)

                setCity(res.data.localidade)
                setDistrict(res.data.bairro)
                setStreet(res.data.logradouro)

                setLoading(false)
            }

            setCep(input)
            return
        }

        setHouseNum(input)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            let res

            if (Object.keys(userAddress).length === 0) {
                res = await dbFetch.post("/address", {
                    "cep": cep.replace(/[\s()\-]/g, ""),
                    "city": city,
                    "district": district,
                    "street": street,
                    "houseNum": houseNum,
                    "userId": userId,
                })
            } else {
                res = await dbFetch.put("/address", {
                    "id": userAddress.id,
                    "cep": cep.replace(/[\s()\-]/g, ""),
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

            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        saveRedirect()
        getUserinfos()
    }, [])

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <form onSubmit={handleSubmit} className={styles.address}>
                    { Object.keys(userAddress).length === 0 ? (
                        <h1>Criar Endereço</h1>
                    ) : (
                        <h1>Atualizar Endereço</h1>
                    )}

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
            )}
        </div>
    )
}

export default Address
