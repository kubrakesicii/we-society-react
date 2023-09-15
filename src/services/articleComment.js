import httpClient from "../utils/httpClient";

export const articleCommentService = {
    insert : async (body) => httpClient.post("/ArticleComments",body),
    getAll : async (articleId) => httpClient.get(`/ArticleComments?articleId=${articleId}`)
}