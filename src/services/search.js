import httpClient from "../utils/httpClient";

export const searchService = {
    search : async (searchKey) => httpClient.get(`/Searchs?searchKey=${searchKey}`),
}