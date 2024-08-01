import axios from "axios"

axios.defaults.withCredentials = true
const dbFetch = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "ngrok-skip-browser-warning": true
    }
})

export default dbFetch
