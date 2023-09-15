import httpClient from "../utils/httpClient";

export const categoryService = {
    getAll: () => httpClient.get("/Categories")
}