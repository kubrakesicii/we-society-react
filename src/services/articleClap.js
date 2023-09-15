import httpClient from "../utils/httpClient";

export const articleClapService = {
    insert : async (body) => httpClient.post("/ArticleClaps",body),
    getAll : async (articleId) => httpClient.get(`/ArticleClaps?articleId=${articleId}`)
}
