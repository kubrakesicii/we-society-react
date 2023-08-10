import { BASE_URL } from "../BaseUrl";


export const GetAllReadingLists = async (userProfileId) => {
    const response = await fetch(`${BASE_URL}/ReadingLists?userProfileId=${userProfileId}`)
    const resData = await response.json();
    return resData.data;
}