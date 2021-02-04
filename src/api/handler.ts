import { AxiosResponse } from 'axios';
import axios from 'axios';
export async function LoginServer(username:string,password:string):Promise<AxiosResponse<{cookie:string}>>{
    return axios.post("https://autospamchat.herokuapp.com/get-cookie",{
        username:username,
        password:password
    })
}
export async function LoginWebService(username:string,password:string):Promise<any>{
    let formData:FormData = new FormData();
    formData.append("account",username);
    formData.append("password",password);
    formData.append("m","1");
    return fetch("https://gaubong.us/login.php",{
        method:"post",
        credentials: "include",
        headers: 
        { 'Postman-Token': '1ce33c15-c7e6-4724-8cf2-92640f816c26',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' ,
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36"
        },
        body:formData,
        redirect: 'follow'
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