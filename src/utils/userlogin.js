import axios from 'axios'
import store from '@/store'
import * as app from "q";

axios.defaults.withCredentials = true;
// axios.defaults.withCredentials=true;
const beseurl  = "http://localhost:9999"
// create an axios instance
const service = axios.create({
    baseURL: beseurl,
    // baseURL: "http://192.168.239.46:9999",
    // baseURL: "http://192.168.168.46:9999",
    timeout: 5000 // request timeout
})

// request interceptor  前端请求拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token !== null) {
            // 使用token 进行请求发送
            config.headers['Authorization'] = localStorage.getItem("token")
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor  响应拦截器
service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default service
