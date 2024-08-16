import axios from "axios"

axios.defaults.withCredentials = true
const dbFetch = axios.create({
    baseURL: "viacep.com.br/ws",
})

export default dbFetch
