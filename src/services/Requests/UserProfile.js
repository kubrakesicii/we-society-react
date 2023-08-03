import { GetToken } from "../../utils/Token";
import { BASE_URL } from "../BaseUrl";


export const GetUserProfile = async (id) => {
    const response = await fetch(`${BASE_URL}/UserProfiles/${id}`)
    const resData = await response.json();
    return resData.data;
}

export const UpdateUserProfile = async (form) => {
    const putData = Object.fromEntries(form);
    const token = GetToken();

    await fetch(`${BASE_URL}/UserProfiles`, {
        method:'PUT',
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(putData)
    });
}