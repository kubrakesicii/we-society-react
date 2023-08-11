import { BASE_URL } from "../BaseUrl";


export const CreateReadingList = async (form) => {
    return await fetch(`${BASE_URL}/ReadingLists`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify(form)
    });
}

export const GetAllReadingLists = async (userProfileId) => {
    const response = await fetch(`${BASE_URL}/ReadingLists?userProfileId=${userProfileId}`)
    const resData = await response.json();
    return resData.data;
}