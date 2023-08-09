import { GetToken } from "../../utils/Token";
import { BASE_URL } from "../BaseUrl";



export const InsertComment = async (form) => {
    const token = GetToken()
    await fetch(`${BASE_URL}/ArticleComments`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(form)
    });
}

export const GetCommentsByArticle = async (articleId) => {
    const response = await fetch(`${BASE_URL}/ArticleComments?articleId=${articleId}`)
    const resData = await response.json();
    return resData.data;
}