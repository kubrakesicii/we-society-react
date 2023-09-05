import { GetToken } from "../../utils/Token";
import { BASE_URL } from "../BaseUrl";


export const CreateReadingList = async (form) => {
    const token = GetToken()

    return await fetch(`${BASE_URL}/ReadingLists`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify(form)
    });
}

export const GetAllReadingLists = async (userProfileId) => {
    const response = await fetch(`${BASE_URL}/ReadingLists?userProfileId=${userProfileId}`)
    const resData = await response.json();
    return resData.data;
}