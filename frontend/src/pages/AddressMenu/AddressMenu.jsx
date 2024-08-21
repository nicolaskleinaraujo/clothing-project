// CSS
import styles from "./AddressMenu.module.css"

// Modules
import dbFetch from "../../config/axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { LoadingContext } from "../../context/LoadingContext"
import { toast } from "react-toastify"
import { useNavigate, Link } from "react-router-dom"
import Loading from "../../components/Loading/Loading"

const AddressMenu = () => {
    const navigate = useNavigate()
    const { userId } = useContext(UserContext)
    const { loading, setLoading } = useContext(LoadingContext)

    const [addresses, setAddresses] = useState([])

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
                navigate("/address")
                return
            }

            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    const deleteAddress = async() => {
        console.log("Deleted!")
    }

    useEffect(() => {
        getAddresses()
    } ,[])

    return (
        <div className={styles.address}>
            { loading && <Loading /> }

            { !loading &&
                <div className={styles.address_addresses}>
                    { 
                        addresses.map(address => (
                            <div key={address.id}>
                                <p>{address.name}</p>
                                <p>{address.city}, {address.houseNum}</p>
                                <p>{address.complement} {address.district}</p>
                                <p>{address.city}, {address.cep}</p>
                                <Link to={`/address/${address.id}`}>EDITAR</Link>
                                <button onClick={deleteAddress}>DELETAR</button>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default AddressMenu
