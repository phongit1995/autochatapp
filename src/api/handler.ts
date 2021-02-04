import { AxiosResponse } from 'axios';
import axios from 'axios';
export async function LoginServer(username:string,password:string):Promise<AxiosResponse<{cookie:string}>>{
    return axios.post("https://autospamchat.herokuapp.com/get-cookie",{
        username:username,
        password:password
    })
}
export async function getDataUserServer(cookie:string):Promise<any>{
    return fetch("https://gaubong.us",{
        method:"get",
        headers:{
            Cookie:cookie
        },
        credentials: 'include'
    })
}