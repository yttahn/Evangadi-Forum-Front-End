import axios from "axios";

const axiosBase = axios.create({
    //baseURL:"http://localhost:5500/api"
    baseURL: "https://evangadi-forum-back-end-zl28.onrender.com/api"
})
export default axiosBase;
