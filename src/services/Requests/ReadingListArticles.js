import { BASE_URL } from "../BaseUrl";


export const GetAllArticlesByReadingList = async (readingListId) => {
    const response = await fetch(`${BASE_URL}/ReadingListArticles?readingListId=${readingListId}`)
    const resData = await response.json();
    return resData.data;
}