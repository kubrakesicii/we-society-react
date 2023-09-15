import httpClient from "../utils/httpClient";

export const readingListArticleService = {
    saveArticle : async (body) => httpClient.post("/ReadingListArticles",body),
    undoSave : async (id) => httpClient.delete(`/ReadingListArticles/${id}`),
    getAllByList : async (readingListId) => httpClient.delete(`/ReadingListArticles?readingListId=${readingListId}`),
    getIsSaved : async (userProfileId,articleId) => httpClient.get(`/ReadingListArticles/IsSaved?userProfileId=${userProfileId}&articleId=${articleId}`),
}

