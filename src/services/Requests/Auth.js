import { SetUser } from "../../utils/Token";
import { BASE_URL } from "../BaseUrl";

export const RegisterUser = async (form) => {
    return await fetch(`${BASE_URL}/Auth/Register`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify(form)
    }).then(res => res.json());
}

export const LoginUser = async (form) => {
    return await fetch(`${BASE_URL}/Auth/Login`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify(form)
    })
    .then(res => res.json())
    .then(resData => {
        console.log("Resdata : ", resData);
        //SetUser(resData.data.token,resData.data.fullName)

        if(resData.message === 'OK'){
            console.log("message ok");
            SetUser(resData.data.token,resData.data)
        }  
        else{
            alert("not ok")
        }      
        return resData
    })
}
