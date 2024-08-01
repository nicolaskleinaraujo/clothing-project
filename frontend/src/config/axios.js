import axios from "axios"

axios.defaults.withCredentials = true
const dbFetch = axios.create({
    baseURL: "https://9679-2804-7f4-5218-7a88-68be-1e34-8a2c-4786.ngrok-free.app",
    headers: {
        "ngrok-skip-browser-warning": true
    }
})

export default dbFetch
