import axios from "axios";
import {ElMessage} from "element-plus";
import router from '../router'

// 创建axios实例对象
const request = axios.create({
    baseURL: '/api',
    timeout: 600000
})

// axios的请求的 request 拦截器 --获取localStore中的token,在请求头中增加token请求头
request.interceptors.request.use(
    (config) => {// 成功回调
        // 在请求头中获取TOKEN
        const data = JSON.parse(localStorage.getItem("loginUser"))
        if (data && data.token) {
            config.headers.authorization = "Bearer " + data.token
        }
        return config;
    },
    (error) => {// 失败回调
        return Promise.reject(error)
    }
)

// axios的响应 response 拦截器
request.interceptors.response.use(
    (response) => {// 成功回调
        return response.data;
    },
    (error) => {// 失败回调
        if (error.response.status === 401) {// 全等
            // console.log("error response status 401");
            // 提示信息
            ElMessage.error("登录超时,请重新登录");
            // 跳转到登录页面
            router.push("/login")
        }
        return Promise.reject(error)
    }
)

export default request