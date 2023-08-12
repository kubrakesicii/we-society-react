import { BASE_URL } from "../BaseUrl";
import { GetToken } from "../../utils/Token";
import { redirect } from "react-router-dom";

//export const GetAllArticles = async(searchKey,pageIndex,pageSize)
// Get all articles, search and paginateion will be added.
export const GetAllArticles = async (pageIndex,pageSize,categoryId=0,searchKey) => {
    const url = `${BASE_URL}/Articles?pageIndex=${pageIndex}&pageSize=${pageSize}&categoryId=${categoryId}`;
    if(searchKey != null) url += `searchKey=${searchKey}`;
    const response = await fetch(url)
    const resData = await response.json();
    return resData.data;
}

export const GetAllPopularArticles = async (categoryId=0) => {
    const url = `${BASE_URL}/Articles/Popular?categoryId=${categoryId}`;
    const response = await fetch(url)
    const resData = await response.json();
    return resData.data;
}

export const GetAllArticlesByUser = async (userProfileId,pageIndex,pageSize) => {
    console.log("user prof id request : ", userProfileId);
    const response = await fetch(`${BASE_URL}/Articles/ByUser?pageIndex=${pageIndex}&pageSize=${pageSize}&userProfileId=${userProfileId}`)
    const resData = await response.json();
    return resData.data;
}

export const GetAllArticleDraftsByUser = async (userProfileId,pageIndex,pageSize) => {
    const response = await fetch(`${BASE_URL}/Articles/Drafts?pageIndex=${pageIndex}&pageSize=${pageSize}&userProfileId=${userProfileId}`)
    const resData = await response.json();
    return resData.data;
}


export const GetArticleDetail = async (id) => {
    const response = await fetch(`${BASE_URL}/Articles/${id}`)
    const resData = await response.json();
    return resData.data;
}


export const InsertArticle = async (form) => {
    const token = GetToken()
    const formData = new FormData();

    formData.append('mainImage', form.mainImage)
    formData.append('title', form.title)
    formData.append('content', form.content)
    formData.append('userProfileId', form.userProfileId)
    formData.append('categoryId', form.categoryId)
    formData.append('isPublished', form.isPublished)

    return await fetch(`${BASE_URL}/Articles`, {
        method:'POST',
        headers:{
            'Authorization': `Bearer ${token}`,
        },
        body:formData
    })
    .then(res => res.json())
    .then(resData => {     
        return resData;
    })
}

export const UpdateArticle = async (id,form) => {
    const token = GetToken()
    const formData = new FormData();

    console.log("Form upd : ", form);

    formData.append('mainImage', form.mainImage)
    formData.append('title', form.title)
    formData.append('content', form.content)
    formData.append('categoryId', form.categoryId)

    return await fetch(`${BASE_URL}/Articles/${id}`, {
        method:'PUT',
        headers:{
            'Authorization': `Bearer ${token}`,
        },
        body:formData
    })   
    .then(res => res.json())
    .then(resData => {     
        return resData;
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