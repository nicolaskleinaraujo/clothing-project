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

    useEffect(() => {
        getUserinfos()
    }, [])

    return (
        <div>
            <h1>Endereço</h1>
        </div>
    )
}

export default Address
