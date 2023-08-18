import { BASE_URL } from "../BaseUrl";


export const SaveArticleToReadingList = async (form) => {
    return await fetch(`${BASE_URL}/ReadingListArticles`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify(form)
    });
}

export const UndoSaveArticleToReadingList = async (id) => {
    return await fetch(`${BASE_URL}/ReadingListArticles/${id}`, {
        method:'DELETE',
        headers:{
            'Content-type': 'application/json'
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

