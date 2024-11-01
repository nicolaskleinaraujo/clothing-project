import axios from "axios"

axios.defaults.withCredentials = true
const dbFetch = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export default dbFetch
