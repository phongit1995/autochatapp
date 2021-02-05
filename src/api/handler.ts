import { AxiosResponse } from 'axios';
import axios from 'axios';
import cheerio from 'react-native-cheerio';
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
export async function getListUserOnline(cookie:string):Promise<string[]>{
    return fetch("https://gaubong.us/modules/?act=online&gt=nu",{
        method:"get",
        headers:{
            'Connection': 'keep-alive',
            'Accept-Encoding': '',
            'Accept-Language': 'en-US,en;q=0.8',
            cookie:cookie +"sex=2;"
        }
    }).then(result=>result.text())
    .then ( async text=>{
        let $ = cheerio.load(text);
        var page:number = $('#ajax-content > div:nth-child(14) > a:nth-child(5)').text();
        console.log("Số Page:" + page);
        let listId:string[]=[];
        let promiseArray:Promise<string[]>[]=[];
        for(let i=1;i<=page;i++){
            promiseArray.push(getListUserIdByPage(i,cookie));
        }
        let dataListId = await Promise.all(promiseArray);
        console.log(listId);
        dataListId.forEach((data)=>{
            try {
                listId= listId.concat(data)
            } catch (error) {
                
            }
        });
        return listId;
    })
}
export function getListUserIdByPage(page:number,cookie:string):Promise<string[]>{
    try {
        
        return fetch(`https://gaubong.us/modules/?act=online&gt=nu&page=${page}`,{
        method:"get",
        headers:{
            'Connection': 'keep-alive',
            'Accept-Encoding': '',
            'Accept-Language': 'en-US,en;q=0.8',
            cookie:cookie +"sex=2;"
        }
        })
        .then(result=>result.text())
        .then(text=>{
            let $ = cheerio.load(text);
            let numberList1 = $('#ajax-content > div[class=list1] > table > tbody > tr > td:nth-child(2) > a');
            let arrayId:string[]= [];
            numberList1.each(function(){
                let link = $(this).attr("href");
                let idUser:string = link.slice( link.lastIndexOf("=") +1, link.length) ;
                if(idUser!="https://gaubong.us/index.php"){
                    arrayId.push(idUser);
                }
                
            })
            return arrayId ;
        })
        .catch((error)=>{
            console.log(page);
            console.log("Lỗi");
            return [];
        })
    }
    catch (err){
        console.log(err);
    }
}