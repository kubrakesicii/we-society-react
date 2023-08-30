import { SetUser } from "../../utils/Token";
import { BASE_URL,AUTH_URL } from "../BaseUrl";

export const RegisterUser = async (form) => {
    return await fetch(`${AUTH_URL}/Auth/Register`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify(form)
    }).then(res => res.json())
}

export const LoginUser = async (form) => {
    return await fetch(`${AUTH_URL}/Auth/Login`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify(form)
    })
    .then(res => res.json())
    .then(resData => {
        if(resData.message === 'OK'){
            SetUser(resData.data.token,resData.data)
        }      
        return resData
    })
}
