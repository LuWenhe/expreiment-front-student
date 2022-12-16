import axios from 'axios';
const $http = axios.create({
})
export const get = (url)=>{
    return new Promise((resolve,reject)=>{
        $http.get(url,{
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem("token"),
            }
        }).then(res=>{

                resolve(res);

        }).catch(error=>{
            alert('网络异常'+error);
        })
    })
}

export const post = (url,params)=>{
    params = params || {};
    return new Promise((resolve,reject)=>{
        $http.post(url,params,{
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem("token"),
            }}).then(res=>{
            resolve(res);
        }).catch(error=>{
            alert('网络异常'+error);
        })
    })
}
