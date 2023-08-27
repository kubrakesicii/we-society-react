import {BASE_URL} from "../BaseUrl";


export const GetAllCategories = async() => {
    const response = await fetch(`${BASE_URL}/Categories`)
    const resData = await response.json();
    return resData.data;
}