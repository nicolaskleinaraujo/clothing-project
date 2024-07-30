import axios from ""

axios.defaults.withCredentials = true
const dbFetch = axios.create({
    baseURL: "http://localhost:3000",
})

export default dbFetch
