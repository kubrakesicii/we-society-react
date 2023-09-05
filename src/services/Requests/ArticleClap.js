import { GetToken } from "../../utils/Token";
import { BASE_URL } from "../BaseUrl";


export const InsertArticleClap = async (form) => {
    const token = GetToken()

    return await fetch(`${BASE_URL}/ArticleClaps`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(form)
    });
}

export const GetAllClappingUsers = async (articleId) => {
    const response = await fetch(`${BASE_URL}/ArticleClaps?articleId=${articleId}`)
    const resData = await response.json();
    return resData.data;
}

