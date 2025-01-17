// CSS
import styles from "./Address.module.css"

// Modules
import dbFetch from "../../config/axios"
import viaCep from "../../config/viaCep"
import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { LoadingContext } from "../../context/LoadingContext"
import { toast } from "react-toastify"
import { RedirectContext } from "../../context/RedirectContext"
import Loading from "../../components/Loading/Loading"

const Address = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)
    const { id } = useParams()

    const { redirect, setRedirect } = useContext(RedirectContext)
    const [getRedirect, setGetRedirect] = useState("")

    const [cep, setCep] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [street, setStreet] = useState("")
    const [houseNum, setHouseNum] = useState("")
    const [complement, setComplement] = useState("")
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")

    const saveRedirect = () => {
        if (redirect !== "") {
            setLoading(true)

            setGetRedirect(redirect)
            setRedirect("")

            setLoading(false)
        }
    }

    const getUserinfos = async() => {
        if (id) {
            setLoading(true)

            const res = await dbFetch.post("/address/user", {
                "id": userId,
                "userId": userId,
            })

            const address = res.data.address.find(address => address.id == id)

            const formatedCep = `${address.cep.slice(0, 5)}-${address.cep.slice(5,8)}`
            const formatedNumber = `(${address.number.slice(0, 2)}) ${address.number.slice(2, 7)}-${address.number.slice(7, 11)}`

            setCep(formatedCep)
            setState(address.state)
            setCity(address.city)
            setDistrict(address.district)
            setStreet(address.street)
            setHouseNum(address.houseNum)
            setComplement(address.complement)
            setName(address.name)
            setNumber(formatedNumber)

            setLoading(false)
        }
    }

    const handleChange = async(e, type) => {
        let input = e.target.value.replace(/[\s()\-]/g, "").replace(/\D/g, "")

        if (type === "CEP") {
            if (input.length > 5) {
                input = `${input.slice(0, 5)}-${input.slice(5,8)}`
            }
    
            if (input.length === 9) {
                try {
                    setLoading(true)
    
                    const rawCep = input.replace(/[\s()\-]/g, "")
                    const res = await viaCep.get(`/${rawCep}/json/`)
    
                    setState(res.data.uf)
                    setCity(res.data.localidade)
                    setDistrict(res.data.bairro)
                    setStreet(res.data.logradouro)
    
                    setLoading(false)
                } catch (error) {
                    setCep("")
                    setLoading(false)
                }
            }

            setCep(input)
            return
        }

        if (type === "PHONE") {
            if (input.length <= 2) {
                input = `(${input}`
            } else if (input.length <= 7) {
                input = `(${input.slice(0, 2)}) ${input.slice(2)}`
            } else if (input.length > 7) {
                input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}-${input.slice(7, 11)}`
            }
    
            setNumber(input)
            return
        }

        setHouseNum(input)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (id === undefined) {
                const res = await dbFetch.post("/address", {
                    "cep": cep.replace(/[\s()\-]/g, ""),
                    "state": state,
                    "city": city,
                    "district": district,
                    "street": street,
                    "houseNum": houseNum,
                    "complement": complement,
                    "name": name,
                    "number": number.replace(/[\s()\-]/g, ""),
                    "userId": userId,
                })

                toast.success(res.data.msg)
            } else if (id) {
                const res = await dbFetch.put("/address", {
                    "id": id,
                    "cep": cep.replace(/[\s()\-]/g, ""),
                    "state": state,
                    "city": city,
                    "district": district,
                    "street": street,
                    "houseNum": houseNum,
                    "complement": complement,
                    "name": name,
                    "number": number.replace(/[\s()\-]/g, ""),
                    "userId": userId,
                })

                toast.success(res.data.msg)
            }

            if (getRedirect === "/create-order") {
                setRedirect(getRedirect)
                navigate("/address-menu")
                return
            } else if (getRedirect !== "") {
                navigate(getRedirect)
                setLoading(false)
                return
            }

            navigate("/address-menu")
            setLoading(false)
        } catch (error) {
            if (error.response.data.msg === "Numero máximo de endereços atingido") {
                toast.info("Número máximo atingido")
                setLoading(false)
                navigate("/address-menu")
                return
            }

            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    useEffect(() => {
        saveRedirect()
        getUserinfos()
    }, [])

    return (
        <div>
            { loading ? (
                <Loading />
            ) : (
                <form onSubmit={handleSubmit} className={styles.address}>
                    { id === undefined ? (
                        <h1>Novo Endereço</h1>
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
                        <p>Estado</p>
                        <input 
                            type="text" 
                            name="state" 
                            id="state" 
                            value={state} 
                            required
                            onChange={(e) => setState(e.target.value)} 
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
                        <p>Número da residência</p>
                        <input 
                            type="text" 
                            name="housenum" 
                            id="housenum" 
                            value={houseNum} 
                            onChange={(e) => handleChange(e)}
                        />
                    </label>

                    <label>
                        <p>Complemento (opcional)</p>
                        <input 
                            type="text" 
                            name="complement" 
                            id="complement" 
                            value={complement} 
                            onChange={(e) => setComplement(e.target.value)} 
                        />
                    </label>

                    <label>
                        <p>Nome completo</p>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            value={name} 
                            required
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </label>

                    <label>
                        <p>Número de celular</p>
                        <input 
                            type="text" 
                            name="phonenum" 
                            id="phonenum" 
                            onChange={(e) => handleChange(e, "PHONE")} 
                            value={number} 
                        />
                    </label>

                    <input type="submit" value={id === undefined ? "Cadastrar" : "Atualizar"} />
                </form>
            )}
        </div>
    )
}

export default Address
