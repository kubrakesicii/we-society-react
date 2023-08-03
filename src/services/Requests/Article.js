import { BASE_URL } from "../BaseUrl";
import { GetToken } from "../../utils/Token";

//export const GetAllArticles = async(searchKey,pageIndex,pageSize)
// Get all articles, search and paginateion will be added.
export const GetAllArticles = async () => {
    const response = await fetch(`${BASE_URL}/Articles`)
    const resData = await response.json();
    return resData.data.items;
}


export const GetAllArticlesByUser = async () => {
    const response = await fetch(`${BASE_URL}/Articles/ByUser`)
    const resData = await response.json();
    return resData.data.items;
}


export const GetArticleDetail = async (id) => {
    const response = await fetch(`${BASE_URL}/Articles/${id}`)
    const resData = await response.json();
    return resData.data.items;
}


export const InsertArticle = async (form) => {
    const postData = Object.fromEntries(form);
    const token = GetToken()
    await fetch(`${BASE_URL}/Articles`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(postData)
    });
}

export const UpdateArticle = async (form) => {
    const postData = Object.fromEntries(form);
    const token = GetToken();

    await fetch(`${BASE_URL}/Articles`, {
        method:'PUT',
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(postData)
    });
}


export const DeleteArticle = async (id) => {
    const token = GetToken();

    await fetch(`${BASE_URL}/Articles/${id}`, {
        method:'DELETE',
        headers:{
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(async res => {
        const resData = await res.json();

        if(resData.message != "OK"){
            return Promise.reject(resData.message);
        }
    })
    .catch(err => console.log(err));
}