import httpClient from "../utils/httpClient";

export const readingListService = {
    insert : async (body) => httpClient.post("/ReadingLists",body),
    getAll : async (userProfileId) => httpClient.get(`/ReadingLists?userProfileId=${userProfileId}`)
}