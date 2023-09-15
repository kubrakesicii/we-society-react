import httpClient from "../utils/httpClient";

export const authService = {
    register: (body) => httpClient.post("/Auth/Register",body),
    login: (body) => httpClient.post("/Auth/Login",body)
}
