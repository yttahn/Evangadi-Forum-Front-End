import axios from "axios";


const  axiosBase = axios.create({
    //baseURL:"http://localhost:3003/api"
    baseURL:"https://evangadi-forum-back-end-zl28.onrender.com/api"
//https://evangadi-forum-back-end-zl28.onrender.com

})
export default axiosBase;
