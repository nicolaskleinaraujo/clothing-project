import axios from "axios"

axios.defaults.withCredentials = false
const viaCep = axios.create({
    baseURL: "https://viacep.com.br/ws",
})

export default viaCep
