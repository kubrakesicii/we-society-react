import { GetToken, SetUser } from "../../utils/Token";
import { BASE_URL } from "../BaseUrl";

// class AuthService {
//     Register = async (form) => {
//         const postData = Object.fromEntries(form);
    
//         await fetch(`${BASE_URL}/Auth/Register`, {
//             method:'POST',
//             headers:{
//                 'Content-type': 'application/json'
//             },
//             body:JSON.stringify(postData)
//         });
//     }

//     Login = async (form) => {
//         console.log("Auth service login start");
//         console.log("BAse url : ", BASE_URL);
//         const postData = Object.fromEntries(form);
    
//         console.log("Post data");
        
//         return await fetch(`${BASE_URL}/Auth/Login`, {
//             method:'POST',
//             headers:{
//                 'Content-type': 'multipart/form-data'
//             },
//             body:JSON.stringify(postData)
//         });
//     }

// }

// export default AuthService;

export const RegisterUser = async (form) => {
    const postData = Object.fromEntries(form);

    console.log("post data: ", postData);

    return await fetch(`${BASE_URL}/Auth/Register`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify(postData)
    });
}

export const LoginUser = async (form) => {
    const postData = Object.fromEntries(form);

    return await fetch(`${BASE_URL}/Auth/Login`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(resData => {
        console.log("Resdata : ", resData.data);
        SetUser(resData.data.token,resData.data.fullName)
    })
}
