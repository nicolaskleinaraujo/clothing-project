// CSS
import styles from "./AddressMenu.module.css"

// Modules
import dbFetch from "../../config/axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { LoadingContext } from "../../context/LoadingContext"
import { toast } from "react-toastify"
import { useNavigate, Link } from "react-router-dom"
import { FiEdit, FiCheckCircle } from "react-icons/fi"
import { AiOutlineDelete } from "react-icons/ai"
import Loading from "../../components/Loading/Loading"
import { RedirectContext } from "../../context/RedirectContext"

const AddressMenu = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)

    const { redirect, setRedirect } = useContext(RedirectContext)
    const [getRedirect, setGetRedirect] = useState("")

    const [addresses, setAddresses] = useState([])

    const saveRedirect = () => {
        if (redirect !== "") {
            setGetRedirect(redirect)
            setRedirect("")
        }
    }

    const getAddresses = async() => {
        setLoading(true)

        try {
            const res = await dbFetch.post("/address/user", {
                "id": userId,
                "userId": userId,
            })

            setAddresses(res.data.address)

            setLoading(false)
        } catch (error) {
            if (error.response.data.msg === "Endereço não encontrado") {
                toast.info("Adicione o seu endereço")
                setLoading(false)
                navigate("/address")
                return
            }

            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    const handleSelectAddress = (addressIndex) => {
        toast.success("Endereço selecionado")
        navigate(getRedirect, { state: { addressIndex } })
    }

    const deleteAddress = async(id) => {
        try {
            const res = await dbFetch.delete("/address", {
                data: { id, userId }
            })
            toast.success(res.data.msg)

            getAddresses()
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        saveRedirect()
        getAddresses()
    } ,[])

    return (
        <div className={styles.address_menu}>
            { loading && <Loading /> }

            { !loading &&
                <>
                    <div className={styles.address_menu_addresses}>
                        { 
                            addresses.map((address, index) => (
                                <div key={address.id}>
                                    <p>{address.name}</p>
                                    <p>{address.city}, {address.houseNum}</p>
                                    <p>{address.complement} {address.district}</p>
                                    <p>{address.city}, {address.state} {address.cep}</p>
                                    <div>
                                        <button 
                                            onClick={() => handleSelectAddress(index)} 
                                            style={getRedirect === "/create-order" ? { display: "block", margin: 0 } : { display: "none" }}
                                        ><FiCheckCircle /></button>

                                        <Link 
                                            to={`/address/${address.id}`} 
                                            style={getRedirect === "/create-order" ? { display: "none" } : { display: "block" }}
                                        ><FiEdit /></Link>

                                        <button 
                                            onClick={() => deleteAddress(address.id)} 
                                            style={getRedirect === "/create-order" ? { display: "none" } : { display: "block" }}
                                        ><AiOutlineDelete /></button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* TODO add redirect if getRedirect exists */}
                    <Link to={"/address"}>Novo endereço</Link>
                </>
            }
        </div>
    )
}

export default AddressMenu
