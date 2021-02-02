import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../common/config';
const instance:AxiosInstance = axios.create({
    baseURL:BASE_URL
})
instance.interceptors.request.use(async(config:AxiosRequestConfig)=>{
    config.headers["User-Agent"]="Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36";
    return config ;
},()=>{})
export default instance ;