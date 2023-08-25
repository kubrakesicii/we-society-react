import {BASE_URL, NODE_BASE_URL } from "../BaseUrl";


export const GetAllCategories = async() => {
    const response = await fetch(`${BASE_URL}/Categories`)
    const resData = await response.json();

    console.log("RES CAT DATA : ", resData.data);
    return resData.data;
}