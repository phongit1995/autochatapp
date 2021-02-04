import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../common/config';
// const tough = require('tough-cookie');
const instance:AxiosInstance = axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
})
// axiosCookieJarSupport(instance);
instance.interceptors.request.use(async(config:AxiosRequestConfig)=>{
    config.headers["User-Agent"]="Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36";
    let cookie = await AsyncStorage.getItem("@cookie");
    config.headers["Cookie"]=cookie ;
    return config ;
},(error)=>{
    console.log(error);
})
instance.interceptors.response.use((res)=>{
    return res;
},(error)=>console.log(error));
// instance.defaults.jar = new tough.CookieJar();
export default instance ;