// 封装自己的 axios
import axios from 'axios'

// 创建一个新的对象
const instance = axios.create({
    baseURL: 'https://conduit.productionready.io/api'
})

// 暴露
export default instance