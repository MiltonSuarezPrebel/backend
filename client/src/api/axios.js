import axios from "axios";

const instance = axios.create({
    baseURL: 'https://backend-mongodb-w0sd.onrender.com/api',
    withCrdentials: true
})

export default instance