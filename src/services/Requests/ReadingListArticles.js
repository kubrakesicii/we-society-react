import { GetToken } from "../../utils/Token";
import { BASE_URL } from "../BaseUrl";


export const SaveArticleToReadingList = async (form) => {
    const token = GetToken()

    return await fetch(`${BASE_URL}/ReadingListArticles`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify(form)
    });
}

export const UndoSaveArticleToReadingList = async (id) => {
    const token = GetToken()

    return await fetch(`${BASE_URL}/ReadingListArticles/${id}`, {
        method:'DELETE',
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const GetAllArticlesByReadingList = async (readingListId) => {
    const response = await fetch(`${BASE_URL}/ReadingListArticles?readingListId=${readingListId}`)
    const resData = await response.json();
    return resData.data;
}


export const GetIsSaved = async (userProfileId,articleId) => {
    const response = await fetch(`${BASE_URL}/ReadingListArticles/IsSaved?userProfileId=${userProfileId}&articleId=${articleId}`)
    const resData = await response.json();
    return resData.data;
}

