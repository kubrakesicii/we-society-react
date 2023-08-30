import {BASE_URL} from "../BaseUrl";

export const GetSearchResults = async(searchKey) => {
    const response = await fetch(`${BASE_URL}/Searchs?searchKey=${searchKey}`)
    const resData = await response.json();
    return resData.data;
}